import { useState } from 'react'
import {
  Stack, TextInput, Button, Paper, Text, Group, Loader, Badge, ThemeIcon, Divider,
} from '@mantine/core'
import { IconPlaneDeparture, IconPlaneArrival, IconEqual } from '@tabler/icons-react'

const WORKER_URL = 'https://flights-proxy.lukechn99.workers.dev'

interface FlightEntry {
  ident?: string
  origin?: { code_iata?: string; city?: string }
  destination?: { code_iata?: string; city?: string }
  scheduled_in?: string
  scheduled_out?: string
  status?: string
}

interface ProxyResponse {
  airport: string
  datetime: string | null
  arrivals: { count: number; flights: FlightEntry[] }
  departures: { count: number; flights: FlightEntry[] }
  busier: 'arrivals' | 'departures' | 'equal'
  error?: string
}

export default function PickMeUpTab() {
  const [airport, setAirport] = useState('')
  const [datetime, setDatetime] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ProxyResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    const code = airport.trim().toUpperCase()
    if (!code) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const params = new URLSearchParams({ airport: code })
      if (datetime) params.set('datetime', new Date(datetime).toISOString())

      const res = await fetch(`${WORKER_URL}?${params}`)
      const data: ProxyResponse = await res.json()

      if (!res.ok || data.error) {
        setError(data.error ?? `Request failed (${res.status})`)
      } else {
        setResult(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const busierIcon = result?.busier === 'arrivals'
    ? <IconPlaneArrival size={20} />
    : result?.busier === 'departures'
      ? <IconPlaneDeparture size={20} />
      : <IconEqual size={20} />

  const busierColor = result?.busier === 'arrivals'
    ? 'teal'
    : result?.busier === 'departures'
      ? 'orange'
      : 'gray'

  const busierLabel = result?.busier === 'arrivals'
    ? 'Arrivals are busier'
    : result?.busier === 'departures'
      ? 'Departures are busier'
      : 'Equally busy'

  return (
    <Stack gap="md" maw={600} mx="auto" pt="md">
      <Text size="sm" c="dimmed">
        Enter an airport IATA code and an optional date/time to see whether arrivals or departures
        are busier — handy for planning pickups and drop-offs.
      </Text>

      <Group grow align="flex-end">
        <TextInput
          label="Airport IATA Code"
          placeholder="e.g. LAX, JFK, ORD"
          value={airport}
          onChange={(e) => setAirport(e.currentTarget.value.toUpperCase())}
          maxLength={4}
          size="sm"
        />
        <TextInput
          label="Date & Time (optional)"
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.currentTarget.value)}
          onClick={(e) => { try { (e.target as HTMLInputElement).showPicker?.() } catch {} }}
          size="sm"
        />
      </Group>

      <Button
        onClick={() => { void handleSearch() }}
        loading={loading}
        disabled={!airport.trim()}
        size="sm"
      >
        Check Traffic
      </Button>

      {error && (
        <Paper p="md" radius="md" withBorder bg="var(--mantine-color-red-light)">
          <Text size="sm" c="red">{error}</Text>
        </Paper>
      )}

      {loading && (
        <Group justify="center" py="xl">
          <Loader size="md" />
        </Group>
      )}

      {result && (
        <Paper p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={700} size="lg">{result.airport}</Text>
              {result.datetime && (
                <Text size="xs" c="dimmed">
                  {new Date(result.datetime).toLocaleString()}
                </Text>
              )}
            </Group>

            <Group justify="center" gap="xl">
              <Stack align="center" gap={4}>
                <ThemeIcon size="xl" radius="xl" variant="light" color="teal">
                  <IconPlaneArrival size={22} />
                </ThemeIcon>
                <Text fw={700} size="xl">{result.arrivals.count}</Text>
                <Text size="xs" c="dimmed">Arrivals</Text>
              </Stack>

              <Stack align="center" gap={4}>
                <ThemeIcon size="xl" radius="xl" variant="light" color="orange">
                  <IconPlaneDeparture size={22} />
                </ThemeIcon>
                <Text fw={700} size="xl">{result.departures.count}</Text>
                <Text size="xs" c="dimmed">Departures</Text>
              </Stack>
            </Group>

            <Divider />

            <Group justify="center">
              <Badge
                size="lg"
                color={busierColor}
                leftSection={busierIcon}
                variant="light"
              >
                {busierLabel}
              </Badge>
            </Group>

            {result.arrivals.flights.length > 0 && (
              <>
                <Text fw={600} size="sm">Recent Arrivals</Text>
                <Stack gap={4}>
                  {result.arrivals.flights.slice(0, 5).map((f, i) => (
                    <Group key={i} justify="space-between">
                      <Text size="xs" fw={500}>{f.ident ?? '—'}</Text>
                      <Text size="xs" c="dimmed">
                        from {f.origin?.code_iata ?? f.origin?.city ?? '?'}
                      </Text>
                      {f.status && <Badge size="xs" variant="dot">{f.status}</Badge>}
                    </Group>
                  ))}
                </Stack>
              </>
            )}

            {result.departures.flights.length > 0 && (
              <>
                <Text fw={600} size="sm">Recent Departures</Text>
                <Stack gap={4}>
                  {result.departures.flights.slice(0, 5).map((f, i) => (
                    <Group key={i} justify="space-between">
                      <Text size="xs" fw={500}>{f.ident ?? '—'}</Text>
                      <Text size="xs" c="dimmed">
                        to {f.destination?.code_iata ?? f.destination?.city ?? '?'}
                      </Text>
                      {f.status && <Badge size="xs" variant="dot">{f.status}</Badge>}
                    </Group>
                  ))}
                </Stack>
              </>
            )}
          </Stack>
        </Paper>
      )}
    </Stack>
  )
}
