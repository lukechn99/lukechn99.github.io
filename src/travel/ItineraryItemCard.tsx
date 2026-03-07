import { useState } from 'react';
import { Card, Text, Group, Stack, ActionIcon, Textarea, Rating, Collapse, Badge, TextInput, Button, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconMapPin, IconTrash, IconChevronDown, IconChevronUp,
  IconCalendar, IconSun, IconCloud, IconCloudRain, IconCloudSnow,
  IconCloudStorm, IconCloudFog, IconTemperature, IconDroplet, IconWind,
  IconPencil, IconInfoCircle,
} from '@tabler/icons-react';
import type { ItineraryItem } from './types.ts';
import type { NominatimResult } from './types.ts';
import TagInput, { colorForTag } from './TagInput.tsx';
import LocationSearch from './LocationSearch.tsx';

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

interface EditState {
  name: string;
  startDate: string;
  endDate: string;
  lat: number;
  lon: number;
  address: ItineraryItem['address'];
  displayName: string;
}

export default function ItineraryItemCard({ item, index, onUpdate, onRemove, onFocus }: ItineraryItemCardProps) {
  const [expanded, { toggle, open: openExpand }] = useDisclosure(false);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [changingLocation, setChangingLocation] = useState(false);

  const editing = editState !== null;

  const startEdit = () => {
    setEditState({
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      lat: item.lat,
      lon: item.lon,
      address: item.address,
      displayName: item.displayName,
    });
    setChangingLocation(false);
    if (!expanded) openExpand();
  };

  const cancelEdit = () => {
    setEditState(null);
    setChangingLocation(false);
  };

  const saveEdit = () => {
    if (!editState) return;
    const locationChanged = editState.lat !== item.lat || editState.lon !== item.lon;
    const dateChanged = editState.startDate !== item.startDate;
    const updated: ItineraryItem = {
      ...item,
      name: editState.name,
      startDate: editState.startDate,
      endDate: editState.endDate,
      lat: editState.lat,
      lon: editState.lon,
      address: editState.address,
      displayName: editState.displayName,
    };
    if (locationChanged || dateChanged) {
      delete updated.weather;
    }
    onUpdate(updated);
    setEditState(null);
    setChangingLocation(false);
  };

  const handleLocationSelect = (result: NominatimResult) => {
    const addr = result.address;
    setEditState(prev => prev ? {
      ...prev,
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      displayName: result.display_name,
      name: result.display_name.split(',')[0] ?? prev.name,
      address: {
        ...(addr?.road && { road: addr.road }),
        ...((addr?.city ?? addr?.town ?? addr?.village) && { city: addr?.city ?? addr?.town ?? addr?.village }),
        ...(addr?.state && { state: addr.state }),
        ...(addr?.country && { country: addr.country }),
        ...(addr?.postcode && { postcode: addr.postcode }),
      },
    } : prev);
    setChangingLocation(false);
  };

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
            {item.weather && (() => {
              const locationLabel = item.address.city ?? item.address.state ?? item.name;
              const dateLabel = item.startDate ? formatDateTime(item.startDate) : 'now';
              return item.weather.isFallback ? (
                <Tooltip label={item.weather.fallbackReason} withArrow multiline w={220} fz="xs">
                  <Group gap={2} wrap="nowrap" style={{ cursor: 'help' }}>
                    {weatherIcon(item.weather.icon)}
                    <IconInfoCircle size={12} color="#fab005" />
                  </Group>
                </Tooltip>
              ) : (
                <Tooltip label={`${Math.round(item.weather.temperature)}°F ${item.weather.description} — ${dateLabel}, ${locationLabel}`} withArrow multiline w={240} fz="xs">
                  <Group gap={0} wrap="nowrap" style={{ cursor: 'help' }}>
                    {weatherIcon(item.weather.icon)}
                  </Group>
                </Tooltip>
              );
            })()}
            <ActionIcon variant="subtle" size="sm" onClick={e => { e.stopPropagation(); startEdit(); }}>
              <IconPencil size={14} />
            </ActionIcon>
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
          {editing ? (
            <Stack gap="sm" mt="xs" onClick={e => e.stopPropagation()}>
              <TextInput
                label="Name"
                value={editState.name}
                onChange={e => { const v = e.currentTarget.value; setEditState(prev => prev ? { ...prev, name: v } : prev); }}
                size="sm"
              />

              <div>
                <Text size="xs" fw={500} mb={4}>Location</Text>
                {changingLocation ? (
                  <Stack gap="xs">
                    <LocationSearch onSelect={handleLocationSelect} />
                    <Button size="xs" variant="subtle" onClick={() => setChangingLocation(false)}>
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <Group gap="xs">
                    <Text size="sm" c="dimmed" style={{ flex: 1 }} truncate="end">
                      {editState.displayName}
                    </Text>
                    <Button size="xs" variant="light" onClick={() => setChangingLocation(true)}>
                      Change
                    </Button>
                  </Group>
                )}
              </div>

              <Group grow wrap="wrap" style={{ gap: 8 }}>
                <TextInput
                  label="Start"
                  type="datetime-local"
                  value={editState.startDate}
                  onChange={e => { const v = e.currentTarget.value; setEditState(prev => prev ? { ...prev, startDate: v } : prev); }}
                  onClick={e => { try { (e.target as HTMLInputElement).showPicker?.() } catch {} }}
                  size="sm"
                  style={{ minWidth: 0, flex: '1 1 140px' }}
                />
                <TextInput
                  label="End"
                  type="datetime-local"
                  value={editState.endDate}
                  onChange={e => { const v = e.currentTarget.value; setEditState(prev => prev ? { ...prev, endDate: v } : prev); }}
                  onClick={e => { try { (e.target as HTMLInputElement).showPicker?.() } catch {} }}
                  size="sm"
                  style={{ minWidth: 0, flex: '1 1 140px' }}
                />
              </Group>

              <Group justify="flex-end">
                <Button size="xs" variant="light" onClick={cancelEdit}>Cancel</Button>
                <Button size="xs" onClick={saveEdit}>Save</Button>
              </Group>
            </Stack>
          ) : (
            <Stack gap="sm" mt="xs" onClick={e => e.stopPropagation()}>
              {item.weather && (() => {
                const locationLabel = item.address.city ?? item.address.state ?? item.name;
                const dateLabel = item.startDate ? formatDateTime(item.startDate) : 'now';
                return (
                <Card padding="xs" radius="sm" withBorder>
                  {item.weather.isFallback ? (
                    <Tooltip label={item.weather.fallbackReason} withArrow multiline w={250} fz="xs">
                      <Badge size="xs" variant="light" color="yellow" mb={6} style={{ cursor: 'help' }}>
                        <Group gap={4} wrap="nowrap">
                          <IconInfoCircle size={10} />
                          <span>Showing current weather</span>
                        </Group>
                      </Badge>
                    </Tooltip>
                  ) : (
                    <Tooltip label={`Forecast for ${dateLabel} at ${locationLabel}`} withArrow multiline w={250} fz="xs">
                      <Badge size="xs" variant="light" color="teal" mb={6} style={{ cursor: 'help' }}>
                        <Group gap={4} wrap="nowrap">
                          <IconInfoCircle size={10} />
                          <span>{dateLabel} — {locationLabel}</span>
                        </Group>
                      </Badge>
                    </Tooltip>
                  )}
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
                      {item.weather.humidity > 0 && (
                        <Group gap={4}>
                          <IconDroplet size={12} />
                          <Text size="xs">{item.weather.humidity}%</Text>
                        </Group>
                      )}
                      <Group gap={4}>
                        <IconWind size={12} />
                        <Text size="xs">{Math.round(item.weather.windSpeed)} mph</Text>
                      </Group>
                    </Stack>
                  </Group>
                </Card>
                );
              })()}

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
          )}
        </Collapse>
      </Stack>
    </Card>
  );
}
