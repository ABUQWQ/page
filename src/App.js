import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  IconButton,
  Typography,
  Link,
  CircularProgress,
  Button,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FancyCard from './FancyCard';
import { MusicNote, Pause, Refresh, Error as ErrorIcon } from '@mui/icons-material';

// 自定义样式组件
const BackgroundGradient = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}08 0%, 
    ${theme.palette.primary.light}0f 25%,
    ${theme.palette.primary.light}14 50%,
    ${theme.palette.primary.main}0a 75%,
    ${theme.palette.primary.light}05 100%)`,
  zIndex: -2,
}));

const DecorativeShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  opacity: 0.1,
  animation: 'float 6s ease-in-out infinite',
}));

const MusicController = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(3),
  right: theme.spacing(3),
  width: 56,
  height: 56,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '1a',
    transform: 'scale(1.05)',
  },
  transition: theme.transitions.create(['transform', 'background-color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  transformStyle: 'preserve-3d',
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  boxShadow: theme.shadows[4],
  '&:hover': {
    boxShadow: theme.shadows[12],
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -2,
    background: `conic-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    filter: 'blur(8px)',
    animation: 'spin 6s linear infinite',
    zIndex: -1,
  },
}));

function App() {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [cardStyle, setCardStyle] = useState({});
  const [audio] = useState(new Audio('https://music.163.com/song/media/outer/url?id=2099310789.mp3'));

  useEffect(() => {
    audio.loop = true;

    const handleFirstInteraction = () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      audio.pause();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleIframeLoad = () => {
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    const iframe = document.getElementById('profileFrame');
    if (iframe) {
      iframe.src = `https://gravatar.com/lingbu.card?t=${new Date().getTime()}`;
    }
  };

  const handleMoveCard = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setCardStyle({
      transform: `rotateX(${(-y / rect.height) * 10}deg) rotateY(${(x / rect.width) * 10}deg)`,
    });
  };

  const handleLeaveCard = () => {
    setCardStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BackgroundGradient />
      
      {/* 装饰性形状 */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <DecorativeShape
          sx={{
            width: 200,
            height: 200,
            top: '10%',
            left: '-5%',
            animationDelay: '-2s',
          }}
        />
        <DecorativeShape
          sx={{
            width: 150,
            height: 150,
            top: '70%',
            right: '-3%',
            animationDelay: '-4s',
          }}
        />
        <DecorativeShape
          sx={{
            width: 100,
            height: 100,
            top: '40%',
            right: '20%',
            animationDelay: '-1s',
          }}
        />
      </Box>

      {/* 音乐控制器 */}
      <MusicController
        onClick={toggleMusic}
        title={isPlaying ? '暂停BGM' : '播放BGM'}
      >
        {isPlaying ? <Pause /> : <MusicNote />}
      </MusicController>

      {/* 主要内容 */}
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
            opacity: 0,
            animation: 'slideInUp 0.8s ease-out 0.2s forwards',
          }}
        >
          <ProfileCard
            elevation={3}
            onMouseMove={handleMoveCard}
            onMouseLeave={handleLeaveCard}
            sx={cardStyle}
          >
            {isLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.paper',
                  zIndex: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}

            {!hasError ? (
              <iframe
                id="profileFrame"
                src="https://gravatar.com/lingbu.card"
                title="个人资料卡片"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{
                  width: '100%',
                  height: 400,
                  border: 'none',
                  display: 'block',
                }}
              />
            ) : (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    bgcolor: 'error.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ErrorIcon fontSize="large" />
                </Box>
                <Typography variant="h6" gutterBottom>
                  加载失败了的说...
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  呜...无法加载卡片，检查下网络或者刷新试试？
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Refresh />}
                  onClick={handleRetry}
                >
                  再试一次！
                </Button>
              </Box>
            )}
          </ProfileCard>
        </Box>
      </Container>
      {/* 页脚 */}
      <Box
        component="footer"
        sx={{
          height: 60,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Link
          href="https://icp.gov.moe/?keyword=20250789"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 1,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 500,
            '&:hover': {
              bgcolor: theme.palette.primary.light + '1a',
              color: 'primary.main',
              transform: 'translateY(-2px)',
            },
            transition: theme.transitions.create(
              ['background-color', 'color', 'transform'],
              {
                duration: theme.transitions.duration.shorter,
              }
            ),
          }}
        >
          萌ICP备20250789号
        </Link>
      </Box>

      {/* 全局样式 */}
      <style jsx global>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}

export default App;
