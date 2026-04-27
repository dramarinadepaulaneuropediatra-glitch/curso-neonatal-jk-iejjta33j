export type LessonType =
  | 'info-cards'
  | 'finnegan'
  | 'esc'
  | 'pharmacology'
  | 'conversions'
  | 'pocket-cards'
  | 'references'
  | 'dual-quiz'
  | 'certification'

export type Lesson = {
  id: string
  title: string
  type: LessonType
  content?: any
  pdfUrl?: string
}

export type Module = {
  id: string
  title: string
  description: string
  duration: string
  lessons: Lesson[]
  thumbnail: string
  animation?: string
}

export const COURSE_DATA: Module[] = [
  {
    id: 'm1',
    title: 'Módulo 1: Introdução à SAN',
    description: 'História, sinais clínicos e diretrizes 2020-2024.',
    duration: '20 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=baby%20hospital&color=blue',
    animation: 'animate-pulse',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Conceitos Iniciais',
        type: 'info-cards',
        content: [
          {
            title: 'O que é SAN?',
            text: 'A Síndrome de Abstinência Neonatal ocorre quando o recém-nascido é exposto a drogas in utero e sofre abstinência ao nascer.',
          },
          {
            title: 'Por que importa?',
            text: 'O diagnóstico precoce e manejo adequado reduzem tempo de internação e melhoram o prognóstico neurodesenvolvimental.',
          },
          {
            title: 'Intervenções iniciais',
            text: 'O foco principal inicial deve ser o tratamento não farmacológico: ambiente calmo, contato pele a pele e aleitamento.',
          },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: 'Módulo 2: Avaliação',
    description: 'Tabela de Finnegan e Algoritmo ESC.',
    duration: '30 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=medical%20chart&color=green',
    animation: 'animate-bounce',
    lessons: [
      { id: 'm2-l1', title: 'Tabela de Finnegan', type: 'finnegan' },
      { id: 'm2-l2', title: 'Algoritmo ESC', type: 'esc' },
    ],
  },
  {
    id: 'm3',
    title: 'Módulo 3: Tratamento Não Farmacológico',
    description: 'Intervenções ambientais e comportamentais.',
    duration: '20 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=mother%20baby&color=pink',
    animation: 'animate-fade-in-up',
    lessons: [
      {
        id: 'm3-l1',
        title: 'Intervenções Essenciais',
        type: 'info-cards',
        content: [
          {
            title: 'Ambiente cura',
            text: 'Mantenha ruído < 50 dB, luz reduzida e minimize manipulações desnecessárias.',
          },
          {
            title: 'Swaddling correto',
            text: 'Enrolar o bebê firmemente proporciona contenção motora e reduz tremores.',
          },
          {
            title: 'Contato pele a pele',
            text: 'Promove estabilidade térmica, cardiorrespiratória e favorece o vínculo.',
          },
          {
            title: 'Agrupamento de cuidados',
            text: 'Realize procedimentos em momentos em que o bebê já estiver acordado.',
          },
        ],
      },
    ],
  },
  {
    id: 'm4',
    title: 'Módulo 4: Tratamento Farmacológico',
    description: 'Manejo de opioides e adjuvantes.',
    duration: '30 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=medicine&color=red',
    animation: 'animate-spin',
    lessons: [{ id: 'm4-l1', title: 'Doses e Medicações', type: 'pharmacology' }],
  },
  {
    id: 'm5',
    title: 'Módulo 5: Conversões',
    description: 'Transição entre drogas.',
    duration: '15 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=calculator&color=orange',
    animation: 'animate-flip',
    lessons: [{ id: 'm5-l1', title: 'Calculadora de Conversão', type: 'conversions' }],
  },
  {
    id: 'm6',
    title: 'Módulo 6: Pocket Cards',
    description: 'Resumos para prática clínica.',
    duration: '10 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=cards&color=purple',
    lessons: [{ id: 'm6-l1', title: 'Galeria Prática', type: 'pocket-cards' }],
  },
  {
    id: 'm7',
    title: 'Módulo 7: Referências',
    description: 'Base científica do protocolo.',
    duration: '5 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=books&color=gray',
    lessons: [{ id: 'm7-l1', title: 'Bibliografia', type: 'references' }],
  },
  {
    id: 'm8',
    title: 'Módulo 8: Avaliação Final',
    description: 'Teste seus conhecimentos.',
    duration: '20 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=exam&color=cyan',
    lessons: [{ id: 'm8-l1', title: 'Quiz de Certificação', type: 'dual-quiz' }],
  },
  {
    id: 'm9',
    title: 'Módulo 9: Certificação',
    description: 'Emissão de certificado.',
    duration: '5 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=certificate&color=yellow',
    lessons: [{ id: 'm9-l1', title: 'Seu Certificado', type: 'certification' }],
  },
]

export const ALL_LESSONS = COURSE_DATA.flatMap((m) => m.lessons)
