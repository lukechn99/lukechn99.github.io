import { useState } from 'react';
import type { FormEvent } from 'react';
import { ActionIcon, Alert, Box, Button, Group, Space, Stack, TextInput } from '@mantine/core';
import { IconChevronLeft, IconInfoCircle, IconSend } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Contact() {
    const navigate = useNavigate()
    const { t } = useTranslation()
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
            setResult(t('contact.success'))
            form.reset()
        } else {
        setResult(t('contact.error'))
        }
    }

    return (<>
        <ActionIcon
            variant="subtle"
            size="lg"
            radius="xl"
            onClick={() => navigate('/')}
            aria-label={t('nav.backHome')}
            style={{ position: 'fixed', top: 68, left: 16, zIndex: 1000 }}
        >
            <IconChevronLeft size={22} />
        </ActionIcon>
        <Stack
        bg="var(--mantine-color-body)"
        p="md" gap="md"
        w="min(80vw, 1800px)"
        mx="auto"
        align="center"
    >
        {result && <Alert variant="light" color="blue" withCloseButton title={result} icon={icon} onClose={() => setResult(null)}></Alert>}
        <Box component="form" onSubmit={onSubmit} w="100%" style={{ textAlign: 'left' }}>
            <TextInput
                withAsterisk
                label={t('contact.name')}
                placeholder={t('contact.namePlaceholder')}
                required={true}
                type="text"
                name="name" // needed for web3forms
                autoComplete="name"
            />
            <Space h="md" />
            <TextInput
                withAsterisk
                label={t('contact.email')}
                placeholder={t('contact.emailPlaceholder')}
                required={true}
                name="email" // needed for web3forms
                type="email"
            />
            <Space h="md" />
            <TextInput
                withAsterisk
                label={t('contact.message')}
                placeholder={t('contact.messagePlaceholder')}
                required={true}
                name="message" // needed for web3forms
                type="text"
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">{t('contact.submit')} {<Space />} {<IconSend />}</Button>
            </Group>
        </Box>
    </Stack></>)
}