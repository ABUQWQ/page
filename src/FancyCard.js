import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  transformStyle: 'preserve-3d',
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -2,
    background: `conic-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    filter: 'blur(8px)',
    animation: 'spin 6s linear infinite',
    zIndex: -1,
  },
  '&:hover': {
    boxShadow: theme.shadows[12],
  },
}));

function FancyCard({ children }) {
  const [style, setStyle] = useState({});

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setStyle({
      transform: `rotateX(${(-y / rect.height) * 10}deg) rotateY(${(x / rect.width) * 10}deg)`,
    });
  };

  const handleLeave = () => setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });

  return (
    <CardRoot onMouseMove={handleMove} onMouseLeave={handleLeave} sx={style}>
      <Typography variant="h6" gutterBottom>
        沉浸式卡片
      </Typography>
      <Typography color="text.secondary">
        {children || '尝试移动鼠标，感受立体效果'}
      </Typography>
    </CardRoot>
  );
}

export default FancyCard;
