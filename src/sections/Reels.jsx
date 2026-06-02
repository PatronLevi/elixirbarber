import { useEffect, useRef, useState } from 'react'
import { Heart, ChatCircle, PaperPlaneTilt, MusicNote, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'

export default function Reels() {
  const sectionRef = useRef(null)
  const videoRef1 = useRef(null)
  const videoRef2 = useRef(null)

  // Sound state
  const [globalMuted, setGlobalMuted] = useState(true)

  // Playback states
  const [isPlaying1, setIsPlaying1] = useState(false)
  const [isPlaying2, setIsPlaying2] = useState(false)

  // Progress states
  const [progress1, setProgress1] = useState(0)
  const [progress2, setProgress2] = useState(0)

  // Likes state
  const [likes, setLikes] = useState({ reel1: 142, reel2: 98 })
  const [hasLiked, setHasLiked] = useState({ reel1: false, reel2: false })

  // Share message states
  const [showCopied1, setShowCopied1] = useState(false)
  const [showCopied2, setShowCopied2] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Sync muted property to bypass React's muted hydration bug on iOS Safari
  useEffect(() => {
    if (videoRef1.current) videoRef1.current.muted = globalMuted
    if (videoRef2.current) videoRef2.current.muted = globalMuted
  }, [globalMuted])

  // IntersectionObserver to auto-play/pause videos based on viewport visibility
  useEffect(() => {
    const playVideo = (videoRef, setPlaying) => {
      if (videoRef.current) {
        videoRef.current.play()
          .then(() => setPlaying(true))
          .catch(err => console.log('Autoplay blocked:', err))
      }
    }

    const pauseVideo = (videoRef, setPlaying) => {
      if (videoRef.current) {
        videoRef.current.pause()
        setPlaying(false)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isReel1 = entry.target.id === 'reel-1-wrapper'
          const videoRef = isReel1 ? videoRef1 : videoRef2
          const setPlaying = isReel1 ? setIsPlaying1 : setIsPlaying2

          if (entry.isIntersecting) {
            playVideo(videoRef, setPlaying)
          } else {
            pauseVideo(videoRef, setPlaying)
          }
        })
      },
      { threshold: 0.3 } // Play when at least 30% of the card is visible
    )

    const card1 = document.getElementById('reel-1-wrapper')
    const card2 = document.getElementById('reel-2-wrapper')

    if (card1) observer.observe(card1)
    if (card2) observer.observe(card2)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Handle Play/Pause on hover or tap
  const handleMouseEnter = (videoRef, setPlaying) => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setPlaying(true)
      }).catch(err => console.log('Autoplay blocked:', err))
    }
  }

  const handleMouseLeave = (videoRef, setPlaying) => {
    if (videoRef.current) {
      videoRef.current.pause()
      setPlaying(false)
    }
  }

  const handleTap = (videoRef, isPlaying, setPlaying) => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setPlaying(false)
      } else {
        videoRef.current.play().then(() => {
          setPlaying(true)
        }).catch(err => console.log('Playback blocked:', err))
      }
    }
  }

  // Update progress bars
  const handleTimeUpdate = (videoRef, setProgress) => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      const duration = videoRef.current.duration
      if (duration) {
        setProgress((current / duration) * 100)
      }
    }
  }

  // Handle pointer scrubbing for seeking in the video
  const handlePointerDown = (e, videoRef) => {
    e.stopPropagation()
    if (!videoRef.current) return
    
    e.currentTarget.setPointerCapture(e.pointerId)
    e.currentTarget.dataset.scrubbing = 'true'
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const ratio = Math.max(0, Math.min(1, clickX / rect.width))
    if (videoRef.current.duration) {
      videoRef.current.currentTime = ratio * videoRef.current.duration
    }
  }

  const handlePointerMove = (e, videoRef) => {
    e.stopPropagation()
    if (e.currentTarget.dataset.scrubbing !== 'true' || !videoRef.current) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const ratio = Math.max(0, Math.min(1, clickX / rect.width))
    if (videoRef.current.duration) {
      videoRef.current.currentTime = ratio * videoRef.current.duration
    }
  }

  const handlePointerUp = (e) => {
    e.stopPropagation()
    e.currentTarget.dataset.scrubbing = 'false'
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  // Toggle global mute state
  const toggleMute = () => {
    const nextMute = !globalMuted
    setGlobalMuted(nextMute)
    if (videoRef1.current) videoRef1.current.muted = nextMute
    if (videoRef2.current) videoRef2.current.muted = nextMute
  }

  // Handle like clicks
  const handleLike = (e, key) => {
    e.stopPropagation()
    const active = hasLiked[key]
    setHasLiked({ ...hasLiked, [key]: !active })
    setLikes({ ...likes, [key]: active ? likes[key] - 1 : likes[key] + 1 })
  };

  // Handle share link copy
  const handleShare = (e, key, setCopied) => {
    e.stopPropagation()
    const url = `${window.location.origin}${window.location.pathname}#reels`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <section
      id="reels"
      ref={sectionRef}
      style={{
        background: 'var(--beige-deep)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        borderTop: '1px solid rgba(120, 110, 80, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Cortes y transformaciones de clientes en video"
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <hr className="divider-gold" style={{ marginBottom: '1.5rem' }} />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 400,
              color: 'var(--ink)',
              lineHeight: 1.05,
            }}
          >
            Elixir Reels<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>cortes & estilos</em>
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem',
              gap: '1.5rem',
            }}
          >
            <p
              style={{
                color: 'var(--ink-soft)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
                margin: 0,
              }}
            >
              Resultados reales de nuestros barberos
            </p>

            {/* Global sound toggle */}
            <button
              onClick={toggleMute}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(120,110,80,0.2)',
                borderRadius: '100px',
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                color: 'var(--gold-soft)',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(120,110,80,0.1)'
                e.currentTarget.style.borderColor = 'var(--gold-soft)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(120,110,80,0.2)'
              }}
            >
              {globalMuted ? (
                <>
                  <SpeakerSlash size={16} />
                  <span>Sonido desactivado</span>
                </>
              ) : (
                <>
                  <SpeakerHigh size={16} />
                  <span>Sonido activado</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Reels container grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(2rem, 5vw, 4rem)',
            maxWidth: '900px',
            marginInline: 'auto',
          }}
        >
          {/* Reel Card 1 */}
          <div
            id="reel-1-wrapper"
            className="reveal reel-card-wrapper"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '340px',
            }}
          >
            <div
              className="reel-card"
              onMouseEnter={() => handleMouseEnter(videoRef1, setIsPlaying1)}
              onMouseLeave={() => handleMouseLeave(videoRef1, setIsPlaying1)}
              onClick={() => handleTap(videoRef1, isPlaying1, setIsPlaying1)}
              style={{
                position: 'relative',
                aspectRatio: '9 / 16',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
                border: '1px solid rgba(120,110,80,0.18)',
                background: 'var(--beige)',
                cursor: 'pointer',
              }}
            >
              <video
                ref={videoRef1}
                src="/reel-video-1.mp4#t=0.001"
                loop
                muted
                autoPlay
                playsInline
                preload="auto"
                onTimeUpdate={() => handleTimeUpdate(videoRef1, setProgress1)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Shading overlay for readability */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%, transparent 80%, rgba(0,0,0,0.3) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Play symbol on hover/tap */}
              {!isPlaying1 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(27,27,27,0.7)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-soft)',
                    border: '1px solid rgba(120,110,80,0.3)',
                    fontSize: '1rem',
                    pointerEvents: 'none',
                    animation: 'pulseGlow 2s infinite',
                  }}
                >
                  ▶
                </div>
              )}

              {/* Instagram UI Overlay: Bottom Info */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.25rem',
                  right: '4.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  color: '#ffffff',
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              >
                {/* Profile row */}
                <a
                  href="https://www.instagram.com/elixir_barber"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    pointerEvents: 'auto',
                    textDecoration: 'none',
                    color: '#ffffff',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--gold)',
                      border: '1px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      color: '#1b1b1b',
                    }}
                  >
                    EX
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
                    elixir_barber
                  </span>
                </a>

                {/* Caption / haircut tag */}
                <p style={{ fontSize: '0.75rem', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.6)', lineHeight: 1.4 }}>
                  Mullet Fade / Comb Over Texturizado ✂️ Trabajo realizado por nuestro equipo.
                </p>

                {/* Sound track */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', opacity: 0.85 }}>
                  <MusicNote size={12} weight="fill" />
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.02em', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    Sonido original &middot; Elixir Barber
                  </span>
                </div>
              </div>

              {/* Right Side Overlay Buttons */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  right: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.25rem',
                  zIndex: 6,
                }}
              >
                {/* Heart Button */}
                <button
                  onClick={(e) => handleLike(e, 'reel1')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: hasLiked.reel1 ? '#E0245E' : '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: 0,
                    transition: 'transform 200ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  aria-label="Dar me gusta"
                >
                  <Heart size={26} weight={hasLiked.reel1 ? 'fill' : 'bold'} style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }} />
                  <span style={{ fontSize: '0.6875rem', color: '#ffffff', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    {likes.reel1}
                  </span>
                </button>

                {/* Comment Mock Button */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'default',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: 0,
                  }}
                  aria-label="Comentarios"
                >
                  <ChatCircle size={26} weight="bold" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }} />
                  <span style={{ fontSize: '0.6875rem', color: '#ffffff', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    14
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={(e) => handleShare(e, 'reel1', setShowCopied1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: 0,
                    transition: 'transform 200ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  aria-label="Compartir enlace"
                >
                  <PaperPlaneTilt size={26} weight="bold" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }} />
                  <span style={{ fontSize: '0.6875rem', color: '#ffffff', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    Compartir
                  </span>
                </button>
              </div>

              {/* Progress Bar Indicator at bottom */}
              <div
                onPointerDown={(e) => handlePointerDown(e, videoRef1)}
                onPointerMove={(e) => handlePointerMove(e, videoRef1)}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '16px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  cursor: 'pointer',
                  zIndex: 12,
                  touchAction: 'none',
                }}
              >
                <div
                  style={{
                    height: '4px',
                    background: 'rgba(255,255,255,0.25)',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background: 'var(--gold)',
                      width: `${progress1}%`,
                      transition: 'width 100ms linear',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Clipboard copied Toast */}
            {showCopied1 && (
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(120, 110, 80, 0.95)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '100px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  zIndex: 20,
                  pointerEvents: 'none',
                  animation: 'fadeInOut 2.5s ease',
                }}
              >
                ¡Enlace de Reel copiado!
              </div>
            )}
          </div>

          {/* Reel Card 2 */}
          <div
            id="reel-2-wrapper"
            className="reveal reel-card-wrapper"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '340px',
            }}
          >
            <div
              className="reel-card"
              onMouseEnter={() => handleMouseEnter(videoRef2, setIsPlaying2)}
              onMouseLeave={() => handleMouseLeave(videoRef2, setIsPlaying2)}
              onClick={() => handleTap(videoRef2, isPlaying2, setIsPlaying2)}
              style={{
                position: 'relative',
                aspectRatio: '9 / 16',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
                border: '1px solid rgba(120,110,80,0.18)',
                background: 'var(--beige)',
                cursor: 'pointer',
              }}
            >
              <video
                ref={videoRef2}
                src="/reel-video-2.mp4#t=0.001"
                loop
                muted
                autoPlay
                playsInline
                preload="auto"
                onTimeUpdate={() => handleTimeUpdate(videoRef2, setProgress2)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Shading overlay for readability */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%, transparent 80%, rgba(0,0,0,0.3) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Play symbol on hover/tap */}
              {!isPlaying2 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(27,27,27,0.7)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-soft)',
                    border: '1px solid rgba(120,110,80,0.3)',
                    fontSize: '1rem',
                    pointerEvents: 'none',
                    animation: 'pulseGlow 2s infinite',
                  }}
                >
                  ▶
                </div>
              )}

              {/* Instagram UI Overlay: Bottom Info */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.25rem',
                  right: '4.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  color: '#ffffff',
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              >
                {/* Profile row */}
                <a
                  href="https://www.instagram.com/elixir_barber"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    pointerEvents: 'auto',
                    textDecoration: 'none',
                    color: '#ffffff',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--gold)',
                      border: '1px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      color: '#1b1b1b',
                    }}
                  >
                    EX
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
                    elixir_barber
                  </span>
                </a>

                {/* Caption / haircut tag */}
                <p style={{ fontSize: '0.75rem', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.6)', lineHeight: 1.4 }}>
                  Curly Skin Fade / Rizo Definido 🔥 Un degradado milimétrico para cabello rizado.
                </p>

                {/* Sound track */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', opacity: 0.85 }}>
                  <MusicNote size={12} weight="fill" />
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.02em', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    Sonido original &middot; Elixir Barber
                  </span>
                </div>
              </div>

              {/* Right Side Overlay Buttons */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  right: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.25rem',
                  zIndex: 6,
                }}
              >
                {/* Heart Button */}
                <button
                  onClick={(e) => handleLike(e, 'reel2')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: hasLiked.reel2 ? '#E0245E' : '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: 0,
                    transition: 'transform 200ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  aria-label="Dar me gusta"
                >
                  <Heart size={26} weight={hasLiked.reel2 ? 'fill' : 'bold'} style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }} />
                  <span style={{ fontSize: '0.6875rem', color: '#ffffff', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    {likes.reel2}
                  </span>
                </button>

                {/* Comment Mock Button */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'default',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: 0,
                  }}
                  aria-label="Comentarios"
                >
                  <ChatCircle size={26} weight="bold" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }} />
                  <span style={{ fontSize: '0.6875rem', color: '#ffffff', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    8
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={(e) => handleShare(e, 'reel2', setShowCopied2)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: 0,
                    transition: 'transform 200ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  aria-label="Compartir enlace"
                >
                  <PaperPlaneTilt size={26} weight="bold" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }} />
                  <span style={{ fontSize: '0.6875rem', color: '#ffffff', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    Compartir
                  </span>
                </button>
              </div>

              {/* Progress Bar Indicator at bottom */}
              <div
                onPointerDown={(e) => handlePointerDown(e, videoRef2)}
                onPointerMove={(e) => handlePointerMove(e, videoRef2)}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '16px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  cursor: 'pointer',
                  zIndex: 12,
                  touchAction: 'none',
                }}
              >
                <div
                  style={{
                    height: '4px',
                    background: 'rgba(255,255,255,0.25)',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background: 'var(--gold)',
                      width: `${progress2}%`,
                      transition: 'width 100ms linear',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Clipboard copied Toast */}
            {showCopied2 && (
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(120, 110, 80, 0.95)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '100px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  zIndex: 20,
                  pointerEvents: 'none',
                  animation: 'fadeInOut 2.5s ease',
                }}
              >
                ¡Enlace de Reel copiado!
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 0 rgba(120,110,80,0.4); }
          50% { transform: translate(-50%, -50%) scale(1.08); box-shadow: 0 0 16px 6px rgba(120,110,80,0.2); }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -10px); }
          15% { opacity: 1; transform: translate(-50%, 0); }
          85% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -10px); }
        }
        @media (hover: hover) {
          .reel-card:hover {
            border-color: var(--gold-soft) !important;
          }
        }
      `}</style>
    </section>
  )
}
