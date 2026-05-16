import { useState, useRef } from 'react';
import { TextInput, Loader, Paper, Text, Group, Stack, UnstyledButton, Badge } from '@mantine/core';
import {
  IconSearch, IconMapPin, IconBed, IconBuildingMonument,
  IconTree, IconBuildingChurch, IconShoppingBag, IconBuildingAirport,
  IconTrain, IconBuildingSkyscraper, IconCoffee, IconBuildingStore,
} from '@tabler/icons-react';
import { searchLocations } from './api.ts';
import { isHotelLocation } from './types.ts';
import type { NominatimResult } from './types.ts';

interface LocationSearchProps {
  onSelect: (result: NominatimResult) => void;
}

function categoryIcon(r: NominatimResult, size = 16) {
  const cls = r.class ?? '';
  const type = r.type ?? '';
  const combined = `${cls}/${type}`;

  if (isHotelLocation(r)) return <IconBed size={size} style={{ flexShrink: 0, color: '#e67700' }} />;
  if (combined.includes('restaurant') || combined.includes('food') || type === 'fast_food') return <IconBuildingStore size={size} style={{ flexShrink: 0, color: '#e03131' }} />;
  if (type === 'cafe' || type === 'coffee') return <IconCoffee size={size} style={{ flexShrink: 0, color: '#795548' }} />;
  if (type === 'supermarket' || type === 'mall' || cls === 'shop') return <IconShoppingBag size={size} style={{ flexShrink: 0, color: '#7048e8' }} />;
  if (type === 'museum' || type === 'gallery' || type === 'artwork') return <IconBuildingMonument size={size} style={{ flexShrink: 0, color: '#f59f00' }} />;
  if (type === 'church' || type === 'place_of_worship' || type === 'cathedral') return <IconBuildingChurch size={size} style={{ flexShrink: 0, color: '#1c7ed6' }} />;
  if (type === 'park' || type === 'nature_reserve' || type === 'forest' || type === 'garden') return <IconTree size={size} style={{ flexShrink: 0, color: '#2f9e44' }} />;
  if (type === 'aerodrome' || type === 'airport') return <IconBuildingAirport size={size} style={{ flexShrink: 0, color: '#1971c2' }} />;
  if (type === 'station' || type === 'subway_entrance' || cls === 'railway') return <IconTrain size={size} style={{ flexShrink: 0, color: '#1971c2' }} />;
  if (cls === 'building' || type === 'commercial' || type === 'office') return <IconBuildingSkyscraper size={size} style={{ flexShrink: 0, color: '#495057' }} />;
  return <IconMapPin size={size} style={{ flexShrink: 0, color: '#868e96' }} />;
}

function formatSubtitle(r: NominatimResult): string {
  const parts = r.display_name.split(',').map(s => s.trim());
  // Skip the first part (already shown as name), show next 2–3 meaningful parts
  const tail = parts.slice(1).filter(Boolean).slice(0, 3).join(', ');
  return tail;
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
    }, 300);
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
        placeholder="Search for a place, restaurant, hotel..."
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
            maxHeight: 440,
            overflowY: 'auto',
          }}
          mt={4}
        >
          <Stack gap={0}>
            {results.map((r, i) => {
              const hotel = isHotelLocation(r);
              const name = r.display_name.split(',')[0] ?? r.display_name;
              const subtitle = formatSubtitle(r);
              return (
                <UnstyledButton
                  key={`${r.place_id}-${i}`}
                  onClick={() => handleSelect(r)}
                  p="sm"
                  style={(theme) => ({
                    borderBottom: `1px solid ${theme.colors?.gray?.[2] ?? '#e9ecef'}`,
                    '&:hover': { backgroundColor: theme.colors?.gray?.[0] ?? '#f8f9fa' },
                  })}
                >
                  <Group gap="xs" wrap="nowrap" align="flex-start">
                    <div style={{ marginTop: 2 }}>
                      {categoryIcon(r)}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <Group gap={6} wrap="nowrap" align="center">
                        <Text size="sm" fw={500} truncate="end" style={{ flex: 1 }}>
                          {name}
                        </Text>
                        {hotel && (
                          <Badge size="xs" variant="light" color="orange" style={{ flexShrink: 0 }}>Hotel</Badge>
                        )}
                        {r.type && !hotel && (
                          <Badge size="xs" variant="light" color="gray" style={{ flexShrink: 0, textTransform: 'none' }}>
                            {r.type.replace(/_/g, ' ')}
                          </Badge>
                        )}
                      </Group>
                      {subtitle && (
                        <Text size="xs" c="dimmed" truncate="end">
                          {subtitle}
                        </Text>
                      )}
                    </div>
                  </Group>
                </UnstyledButton>
              );
            })}
          </Stack>
        </Paper>
      )}
    </div>
  );
}
