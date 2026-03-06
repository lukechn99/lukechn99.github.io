import { useState } from 'react';
import { Badge, Group, TextInput, ActionIcon } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TAG_COLORS = [
  'blue', 'grape', 'teal', 'orange', 'cyan', 'pink', 'indigo', 'lime', 'violet', 'yellow',
];

function colorForTag(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length] as string;
}

export default function TagInput({ tags, onChange, placeholder = 'Add a tag...' }: TagInputProps) {
  const [input, setInput] = useState('');

  const addTag = () => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter(t => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <Group gap="xs" mb={tags.length > 0 ? 'xs' : 0}>
        {tags.map(tag => (
          <Badge
            key={tag}
            color={colorForTag(tag)}
            variant="light"
            rightSection={
              <ActionIcon
                size="xs"
                radius="xl"
                variant="transparent"
                color={colorForTag(tag)}
                onClick={() => removeTag(tag)}
              >
                <IconX size={10} />
              </ActionIcon>
            }
            style={{ cursor: 'default', paddingRight: 3 }}
          >
            {tag}
          </Badge>
        ))}
      </Group>
      <Group gap="xs">
        <TextInput
          value={input}
          onChange={e => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          size="xs"
          style={{ flex: 1 }}
        />
        <ActionIcon variant="light" size="sm" onClick={addTag} disabled={!input.trim()}>
          <IconPlus size={14} />
        </ActionIcon>
      </Group>
    </div>
  );
}

export { colorForTag };
