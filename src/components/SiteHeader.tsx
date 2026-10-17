import { ActionIcon, Button, Group, Menu, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconCheck, IconLanguage, IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../i18n/index.ts'

export const HEADER_HEIGHT = 56

/** Site-wide header: language picker on the left, light/dark toggle on the right. */
export default function SiteHeader() {
    const { t, i18n } = useTranslation()
    const { setColorScheme } = useMantineColorScheme()
    const scheme = useComputedColorScheme('light', { getInitialValueInEffect: false })
    const isDark = scheme === 'dark'
    const current = LANGUAGES.find(l => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0]

    return (
        <header
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, height: HEADER_HEIGHT, zIndex: 1200,
                display: 'flex', alignItems: 'center', padding: '0 16px',
                background: isDark ? 'rgba(26,27,30,0.85)' : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                borderBottom: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-2)'}`,
            }}
        >
            <Group justify="space-between" w="100%" wrap="nowrap">
                <Menu position="bottom-start" shadow="md" width={180} zIndex={1300}>
                    <Menu.Target>
                        <Button
                            variant="subtle" color="gray" size="sm"
                            leftSection={<IconLanguage size={18} />}
                            aria-label={t('header.language')}
                        >
                            {current.label}
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>{t('header.language')}</Menu.Label>
                        {LANGUAGES.map(l => (
                            <Menu.Item
                                key={l.code}
                                lang={l.htmlLang}
                                onClick={() => { void i18n.changeLanguage(l.code) }}
                                rightSection={l.code === current.code ? <IconCheck size={14} /> : null}
                            >
                                {l.label}
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>

                <Tooltip label={isDark ? t('header.lightMode') : t('header.darkMode')} zIndex={1300}>
                    <ActionIcon
                        variant="default" size="lg" radius="xl"
                        onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
                        aria-label={isDark ? t('header.lightMode') : t('header.darkMode')}
                    >
                        {isDark ? <IconMoon size={18} /> : <IconSun size={18} />}
                    </ActionIcon>
                </Tooltip>
            </Group>
        </header>
    )
}
