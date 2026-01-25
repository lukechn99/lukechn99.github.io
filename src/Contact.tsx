import { useState } from 'react';
import type { FormEvent } from 'react';
import { Alert, Button, Group, Space, Stack, TextInput } from '@mantine/core';
import { IconInfoCircle, IconSend } from '@tabler/icons-react';

export default function Contact() {
  const [result, setResult] = useState<string | null>(null)

  const icon = <IconInfoCircle />

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    // Check metrics and configuration at https://app.web3forms.com/dashboard
    formData.append("access_key", "4f764b66-efef-4656-b7eb-1c426af6d1d7")

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })

    const data = await response.json()
    setResult(data.success ? "Success!" : "Error")
  }

  return (<Stack maw="80vw" bg="var(--mantine-color-body)" p="md" gap="md">
    {result && <Alert variant="light" color="blue" withCloseButton title="Alert title" icon={icon} onClose={() => setResult(null)}>
      <p>{result}</p>
    </Alert>}
    <form onSubmit={onSubmit} >
      <TextInput
        withAsterisk
        label="Name"
        placeholder="John Wick"
        required={true}
        type="text"
        autoComplete="name"
      />
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        required={true}
        type="email"
      />
      <TextInput
        withAsterisk
        label="Message"
        placeholder="I'd like to offer you a job!"
        required={true}
        type="text"
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit {<Space />} {<IconSend />}</Button>
      </Group>
    </form>
  </Stack>)
}