import { useState } from 'react';
import type { FormEvent } from 'react';
import { Alert, Box, Button, Group, Space, Stack, TextInput } from '@mantine/core';
import { IconInfoCircle, IconSend } from '@tabler/icons-react';

export default function Contact() {
    const [result, setResult] = useState<string | null>(null)

    const icon = <IconInfoCircle />

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)

        // Check metrics and configuration at https://app.web3forms.com/dashboard
        formData.append("access_key", "4f764b66-efef-4656-b7eb-1c426af6d1d7")

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })

        const data = await response.json()
        if (data.success) {
            setResult("Success!")
            form.reset()
        } else {
        setResult("Error")
        }
    }

    return (<Stack
        bg="var(--mantine-color-body)"
        p="md" gap="md"
        w="80vw"
        mx="auto"
        align="center"
    >
        {result && <Alert variant="light" color="blue" withCloseButton title={result} icon={icon} onClose={() => setResult(null)}></Alert>}
        <Box component="form" onSubmit={onSubmit} w="100%" style={{ textAlign: 'left' }}>
            <TextInput
                withAsterisk
                label="Name"
                placeholder="John Wick"
                required={true}
                type="text"
                name="name" // needed for web3forms
                autoComplete="name"
            />
            <Space h="md" />
            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                required={true}
                name="email" // needed for web3forms
                type="email"
            />
            <Space h="md" />
            <TextInput
                withAsterisk
                label="Message"
                placeholder="I'd like to offer you a job!"
                required={true}
                name="message" // needed for web3forms
                type="text"
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit {<Space />} {<IconSend />}</Button>
            </Group>
        </Box>
    </Stack>)
}