import { Group, Text } from '@mantine/core';
import { IconCar } from '@tabler/icons-react';

interface TransitConnectorProps {
  distance: number;
  duration: number;
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}

export default function TransitConnector({ distance, duration }: TransitConnectorProps) {
  const miles = (distance / 1609.34).toFixed(1);

  return (
    <Group justify="center" gap={6} py={2}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '2px 10px', borderRadius: 99,
        background: 'var(--mantine-color-gray-1)',
        border: '1px solid var(--mantine-color-gray-3)',
      }}>
        <IconCar size={12} color="var(--mantine-color-gray-6)" />
        <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
          {miles} mi · {formatDuration(duration)}
        </Text>
      </div>
    </Group>
  );
}
