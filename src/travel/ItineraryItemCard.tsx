import { Card, Text, Group, Stack, ActionIcon, Textarea, Rating, Collapse, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconMapPin, IconTrash, IconChevronDown, IconChevronUp,
  IconCalendar, IconSun, IconCloud, IconCloudRain, IconCloudSnow,
  IconCloudStorm, IconCloudFog, IconTemperature, IconDroplet, IconWind,
} from '@tabler/icons-react';
import type { ItineraryItem } from './types.ts';
import TagInput, { colorForTag } from './TagInput.tsx';

function weatherIcon(icon: string, size = 18) {
  const props = { size, stroke: 1.5 };
  switch (icon) {
    case 'sun':         return <IconSun {...props} color="#f59f00" />;
    case 'cloud-sun':   return <IconSun {...props} color="#fab005" />;
    case 'cloud':       return <IconCloud {...props} color="#868e96" />;
    case 'cloud-rain':  return <IconCloudRain {...props} color="#339af0" />;
    case 'cloud-fog':   return <IconCloudFog {...props} color="#868e96" />;
    case 'snowflake':   return <IconCloudSnow {...props} color="#74c0fc" />;
    case 'cloud-storm': return <IconCloudStorm {...props} color="#5c7cfa" />;
    default:            return <IconCloud {...props} />;
  }
}

function formatDateTime(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
}

interface ItineraryItemCardProps {
  item: ItineraryItem;
  index: number;
  onUpdate: (item: ItineraryItem) => void;
  onRemove: (id: string) => void;
  onFocus: (item: ItineraryItem) => void;
}

export default function ItineraryItemCard({ item, index, onUpdate, onRemove, onFocus }: ItineraryItemCardProps) {
  const [expanded, { toggle }] = useDisclosure(false);

  const addressParts = [
    item.address.road,
    item.address.city,
    item.address.state,
    item.address.country,
  ].filter(Boolean);

  return (
    <Card padding="sm" radius="md" withBorder style={{ cursor: 'pointer' }} onClick={() => onFocus(item)}>
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap">
          <Group gap="xs" wrap="nowrap" style={{ minWidth: 0 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: '#339af0', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13, flexShrink: 0,
            }}>
              {index + 1}
            </div>
            <IconMapPin size={16} style={{ flexShrink: 0, color: '#339af0' }} />
            <div style={{ minWidth: 0 }}>
              <Text fw={600} size="sm" truncate="end">{item.name}</Text>
              <Text size="xs" c="dimmed" truncate="end">{addressParts.join(', ')}</Text>
            </div>
          </Group>
          <Group gap={4} wrap="nowrap">
            {item.weather && weatherIcon(item.weather.icon)}
            <ActionIcon variant="subtle" size="sm" onClick={e => { e.stopPropagation(); toggle(); }}>
              {expanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
            </ActionIcon>
            <ActionIcon variant="subtle" color="red" size="sm" onClick={e => { e.stopPropagation(); onRemove(item.id); }}>
              <IconTrash size={14} />
            </ActionIcon>
          </Group>
        </Group>

        <Group gap="xs">
          <IconCalendar size={13} style={{ color: '#868e96' }} />
          <Text size="xs" c="dimmed">
            {formatDateTime(item.startDate)}
            {item.endDate ? ` — ${formatDateTime(item.endDate)}` : ''}
          </Text>
        </Group>

        {item.tags.length > 0 && (
          <Group gap={4}>
            {item.tags.map(tag => (
              <Badge key={tag} size="xs" variant="light" color={colorForTag(tag)}>{tag}</Badge>
            ))}
          </Group>
        )}

        <Collapse in={expanded}>
          <Stack gap="sm" mt="xs" onClick={e => e.stopPropagation()}>
            {item.weather && (
              <Card padding="xs" radius="sm" withBorder>
                <Group justify="space-between">
                  <Group gap="xs">
                    {weatherIcon(item.weather.icon, 24)}
                    <div>
                      <Text fw={600} size="sm">{Math.round(item.weather.temperature)}°F</Text>
                      <Text size="xs" c="dimmed">{item.weather.description}</Text>
                    </div>
                  </Group>
                  <Stack gap={2} align="flex-end">
                    <Group gap={4}>
                      <IconTemperature size={12} />
                      <Text size="xs">Feels {Math.round(item.weather.feelsLike)}°F</Text>
                    </Group>
                    <Group gap={4}>
                      <IconDroplet size={12} />
                      <Text size="xs">{item.weather.humidity}%</Text>
                    </Group>
                    <Group gap={4}>
                      <IconWind size={12} />
                      <Text size="xs">{Math.round(item.weather.windSpeed)} mph</Text>
                    </Group>
                  </Stack>
                </Group>
              </Card>
            )}

            <div>
              <Text size="xs" fw={500} mb={4}>Rating</Text>
              <Rating
                value={item.rating ?? 0}
                onChange={(val: number) => onUpdate({ ...item, rating: val })}
                size="sm"
              />
            </div>

            <div>
              <Text size="xs" fw={500} mb={4}>Notes & Review</Text>
              <Textarea
                value={item.notes}
                onChange={e => onUpdate({ ...item, notes: e.currentTarget.value })}
                placeholder="Add notes, tips, or a review..."
                autosize
                minRows={2}
                maxRows={6}
                size="xs"
              />
            </div>

            <div>
              <Text size="xs" fw={500} mb={4}>Tags</Text>
              <TagInput
                tags={item.tags}
                onChange={(tags: string[]) => onUpdate({ ...item, tags })}
                placeholder="Tag this stop..."
              />
            </div>

            <Group gap="xs">
              <Text size="xs" c="dimmed">
                {item.lat.toFixed(4)}, {item.lon.toFixed(4)}
              </Text>
              {item.category && (
                <Badge size="xs" variant="outline">{item.category} / {item.type}</Badge>
              )}
            </Group>
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
}
