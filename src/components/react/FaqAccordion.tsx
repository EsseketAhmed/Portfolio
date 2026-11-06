import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { Faq } from '../../types/sanity'

interface Props {
  faqs: Faq[]
}

const FALLBACK_FAQS: Faq[] = [
  {
    _id: '1',
    question: 'What types of projects do you specialise in?',
    answer: 'I specialise in sports graphics and football campaigns, visual identities, advertising, creative direction, and digital visual storytelling. My work spans from match-day content for professional clubs to full brand identity systems.',
  },
  {
    _id: '2',
    question: 'How does a project with you typically work?',
    answer: 'Every project starts with a brief and a discovery call to understand your vision, objectives and audience. From there I develop concepts, refine through feedback, and deliver polished final assets — with clear timelines at every stage.',
  },
  {
    _id: '3',
    question: 'What information do I need to start a project?',
    answer: 'A clear brief helps: your brand guidelines (if any), project goals, examples you like, and your timeline and budget. Even rough ideas are a great starting point — we can refine everything together.',
  },
  {
    _id: '4',
    question: 'Do you work with international clients?',
    answer: 'Absolutely. Most of my collaborations are with clubs, brands and agencies across Europe, the Middle East and beyond. Remote collaboration works seamlessly through shared tools and regular check-ins.',
  },
]

export default function FaqAccordion({ faqs }: Props) {
  const items = faqs.length > 0 ? faqs : FALLBACK_FAQS
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string) {
    setOpenId(prev => prev === id ? null : id)
  }

  return (
    <section className="faq-section" aria-label="Frequently Asked Questions">
      <div className="faq-section__header">
        <span className="section-label">Got Questions?</span>
        <h2 className="faq-section__title">
          FREQUENTLY<br /><span className="gradient-text">ASKED QUESTIONS</span>
        </h2>
      </div>

      <div className="faq-list" role="list">
        {items.map((faq, i) => {
          const isOpen = openId === faq._id
          return (
            <div key={faq._id} className="faq-item" role="listitem">
              <button
                className="faq-item__trigger"
                onClick={() => toggle(faq._id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq._id}`}
              >
                <span className="faq-item__number gradient-text">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="faq-item__question">{faq.question}</span>
                <motion.span
                  className="faq-item__icon"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${faq._id}`}
                    role="region"
                    aria-label={faq.question}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="faq-item__answer">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="faq-item__divider" aria-hidden="true" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
