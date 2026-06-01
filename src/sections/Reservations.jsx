import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CalendarCheck, Send, Scissors, ChevronDown } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const services = [
  'Haircut',
  'Beard',
  'Haircut & Beard',
  'Signature Haircut & Beard',
  'Facial Cleansing',
  'Elixir Total Experience',
  'Elixir Image Design',
  'Color',
  'Perm',
  'Kids Haircut',
  'Traditional Shave',
];

export default function Reservations() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section
      id="reservas"
      className="relative texture-linen bg-[#E8DCC8] py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative monogram */}
      <div
        aria-hidden="true"
        className="monogram-e absolute -bottom-20 -right-10 text-[20rem] md:text-[28rem] select-none leading-none"
      >
        E
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* ── LEFT: CTA Column ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col items-start"
          >
            {/* Small label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="gold-line-short" />
              <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#C9A84C]">
                Reservas
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#0A0A0A] leading-[1.1] mb-6"
            >
              Reserva tu
              <br />
              <span className="italic text-[#C9A84C]">experiencia</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="font-sans text-base md:text-lg text-[#2C2C2C] leading-relaxed max-w-md mb-10"
            >
              Cada visita a ELIXIR es un momento para ti. Reserva tu cita y vive
              la experiencia.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
            >
              <a
                href="https://elixirbarber.pedircita.online"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span className="flex items-center gap-3">
                  <CalendarCheck className="w-4 h-4" />
                  Reservar cita
                </span>
              </a>
            </motion.div>

            {/* Extra info nuggets */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease, delay: 0.55 }}
              className="mt-12 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 text-[#2C2C2C]">
                <Scissors className="w-4 h-4 text-[#C9A84C]" />
                <span className="font-sans text-sm">
                  Confirmacion inmediata por WhatsApp
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#2C2C2C]">
                <CalendarCheck className="w-4 h-4 text-[#C9A84C]" />
                <span className="font-sans text-sm">
                  Disponibilidad en tiempo real
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Contact Form Column ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="w-full"
          >
            {/* Gold separator visible on mobile only (above form) */}
            <div className="gold-line mb-10 lg:hidden" />

            {/* Form card */}
            <div className="bg-[#FAF8F4] border border-[#C9A84C]/20 p-8 md:p-10 lg:p-12">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#0A0A0A] mb-2">
                Contacto directo
              </h3>
              <p className="font-sans text-sm text-[#2C2C2C] mb-8">
                Si prefieres, escríbenos y te responderemos lo antes posible.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                noValidate
              >
                {/* Nombre */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="nombre"
                    className="font-sans text-xs font-medium uppercase tracking-wider text-[#2C2C2C]"
                  >
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full bg-[#FAF8F4] border border-[#C9A84C]/20 px-4 py-3 font-sans text-sm text-[#0A0A0A] placeholder:text-[#6B6355]/50 outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all duration-300"
                    {...register('nombre', { required: true })}
                  />
                  {errors.nombre && (
                    <span className="font-sans text-xs text-red-600">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>

                {/* Telefono */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="telefono"
                    className="font-sans text-xs font-medium uppercase tracking-wider text-[#2C2C2C]"
                  >
                    Telefono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    placeholder="+34 600 000 000"
                    className="w-full bg-[#FAF8F4] border border-[#C9A84C]/20 px-4 py-3 font-sans text-sm text-[#0A0A0A] placeholder:text-[#6B6355]/50 outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all duration-300"
                    {...register('telefono', { required: true })}
                  />
                  {errors.telefono && (
                    <span className="font-sans text-xs text-red-600">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>

                {/* Servicio deseado */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="servicio"
                    className="font-sans text-xs font-medium uppercase tracking-wider text-[#2C2C2C]"
                  >
                    Servicio deseado
                  </label>
                  <div className="relative">
                    <select
                      id="servicio"
                      className="w-full appearance-none bg-[#FAF8F4] border border-[#C9A84C]/20 px-4 py-3 pr-10 font-sans text-sm text-[#0A0A0A] outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all duration-300 cursor-pointer"
                      {...register('servicio', { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecciona un servicio
                      </option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C] pointer-events-none" />
                  </div>
                  {errors.servicio && (
                    <span className="font-sans text-xs text-red-600">
                      Selecciona un servicio
                    </span>
                  )}
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="mensaje"
                    className="font-sans text-xs font-medium uppercase tracking-wider text-[#2C2C2C]"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    placeholder="Cuentanos en que podemos ayudarte..."
                    className="w-full bg-[#FAF8F4] border border-[#C9A84C]/20 px-4 py-3 font-sans text-sm text-[#0A0A0A] placeholder:text-[#6B6355]/50 outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all duration-300 resize-none"
                    {...register('mensaje')}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="btn-primary self-start mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-3">
                    <Send className="w-4 h-4" />
                    Enviar mensaje
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ── Full-width gold separator at bottom ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="gold-line mt-20 md:mt-28 origin-left"
        />
      </div>
    </section>
  );
}
