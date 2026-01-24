import { Collapse, Box } from '@mantine/core';
import { useHover } from '@mantine/hooks';

function PushingHoverIcon(
    actionIcon: React.ReactNode,
    collapseContent: React.ReactNode
) {
  const { hovered, ref } = useHover();

  return (
    <Box ref={ref}>
      {actionIcon}
      
      {/* Collapse takes up physical space, pushing lower items down */}
      <Collapse in={hovered}>
        {collapseContent}
      </Collapse>
    </Box>
  );
}

export default PushingHoverIcon;