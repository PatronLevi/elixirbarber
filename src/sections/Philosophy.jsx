import { motion } from 'framer-motion';

export default function Philosophy() {
  return (
    <section
      id="filosofia"
      className="relative bg-[#F0EAD6] py-28 md:py-40 overflow-hidden"
    >
      {/* Texture */}
      <div className="absolute inset-0 texture-linen" />

      {/* Decorative monogram */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 monogram-e text-[24rem] md:text-[36rem] lg:text-[48rem] select-none">
        E
      </div>

      {/* Gold lines top and bottom */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      <div className="absolute bottom-0 left-0 right-0 gold-line" />

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12 text-center">
        {/* Decorative element */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="gold-line-short mx-auto mb-10"
        />

        {/* Quote / Manifesto */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Opening quote mark */}
          <span className="absolute -top-8 -left-2 md:-left-8 font-serif text-6xl md:text-7xl text-[#C9A84C]/20 leading-none select-none">
            &ldquo;
          </span>

          <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-[1.4] text-[#0A0A0A] tracking-wide">
            Cada visita es un ritual. Cada corte, una obra. En ELIXIR creemos que el cuidado masculino es un acto de
            <span className="italic text-[#C9A84C]"> precision </span>
            y de
            <span className="italic text-[#C9A84C]"> presencia</span>.
          </p>

          {/* Closing quote mark */}
          <span className="absolute -bottom-12 -right-2 md:-right-8 font-serif text-6xl md:text-7xl text-[#C9A84C]/20 leading-none select-none">
            &rdquo;
          </span>
        </motion.blockquote>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="gold-line-short mx-auto mt-14 mb-8"
        />

        {/* Welcome */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-sm md:text-base text-[#6B6355] tracking-wider uppercase"
        >
          Bienvenido a ELIXIR
        </motion.p>
      </div>
    </section>
  );
}
