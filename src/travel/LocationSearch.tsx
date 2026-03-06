import { useState, useRef } from 'react';
import { TextInput, Loader, Paper, Text, Group, Stack, UnstyledButton } from '@mantine/core';
import { IconSearch, IconMapPin } from '@tabler/icons-react';
import { searchLocations } from './api.ts';
import type { NominatimResult } from './types.ts';

interface LocationSearchProps {
  onSelect: (result: NominatimResult) => void;
}

export default function LocationSearch({ onSelect }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const doSearch = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchLocations(value);
        setResults(data);
        setShowResults(data.length > 0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleSelect = (result: NominatimResult) => {
    onSelect(result);
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <TextInput
        value={query}
        onChange={e => doSearch(e.currentTarget.value)}
        onFocus={() => results.length > 0 && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        placeholder="Search for a location..."
        leftSection={<IconSearch size={16} />}
        rightSection={loading ? <Loader size="xs" /> : null}
        size="md"
      />

      {showResults && (
        <Paper
          shadow="md"
          radius="md"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: 320,
            overflowY: 'auto',
          }}
          mt={4}
        >
          <Stack gap={0}>
            {results.map(r => (
              <UnstyledButton
                key={r.place_id}
                onClick={() => handleSelect(r)}
                p="sm"
                style={(theme) => ({
                  borderBottom: `1px solid ${theme.colors?.gray?.[2] ?? '#e9ecef'}`,
                  '&:hover': { backgroundColor: theme.colors?.gray?.[0] ?? '#f8f9fa' },
                })}
              >
                <Group gap="xs" wrap="nowrap">
                  <IconMapPin size={16} style={{ flexShrink: 0, color: '#868e96' }} />
                  <div style={{ minWidth: 0 }}>
                    <Text size="sm" fw={500} truncate="end">
                      {r.display_name.split(',')[0]}
                    </Text>
                    <Text size="xs" c="dimmed" truncate="end">
                      {r.display_name}
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
            ))}
          </Stack>
        </Paper>
      )}
    </div>
  );
}
