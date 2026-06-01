import { motion } from 'framer-motion'
import heroImg from '../assets/hero-barbershop.png'
import galleryFade from '../assets/gallery-fade.png'
import galleryShave from '../assets/gallery-shave.png'
import galleryProducts from '../assets/gallery-products.png'
import galleryDetail from '../assets/gallery-detail.png'

const galleryItems = [
  {
    id: 1,
    src: heroImg,
    alt: 'Barbería premium interior',
    className: 'col-span-1 md:col-span-2 row-span-1',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 2,
    src: galleryFade,
    alt: 'Corte fade de precisión',
    className: 'col-span-1 row-span-1 md:row-span-2',
    aspect: 'aspect-[3/4] md:aspect-auto md:h-full',
  },
  {
    id: 3,
    src: galleryShave,
    alt: 'Afeitado clásico con navaja',
    className: 'col-span-1 row-span-1',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    src: galleryProducts,
    alt: 'Productos de cuidado masculino',
    className: 'col-span-1 row-span-1',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 5,
    src: galleryDetail,
    alt: 'Detalle de corte artesanal',
    className: 'col-span-1 md:col-span-3 row-span-1',
    aspect: 'aspect-[21/9]',
  },
]

const easeOut = [0.16, 1, 0.3, 1]

export default function Gallery() {
  return (
    <section id="galeria" className="relative bg-[#F0EAD6] py-24 md:py-32 overflow-hidden">
      {/* Linen texture */}
      <div className="absolute inset-0 texture-linen pointer-events-none" />

      {/* Gold monogram watermark */}
      <div
        className="monogram-e absolute -right-16 top-1/2 -translate-y-1/2 text-[28rem] md:text-[40rem] leading-none select-none z-0"
        aria-hidden="true"
      >
        E
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <span className="font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase text-[#C9A84C] block mb-4">
            Nuestro trabajo
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-[#0A0A0A] italic">
            Galería
          </h2>
          <div className="gold-line-short mx-auto mt-6" />
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-auto">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`${item.className} group relative overflow-hidden rounded-lg`}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: easeOut,
              }}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden rounded-lg`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="img-warm absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
