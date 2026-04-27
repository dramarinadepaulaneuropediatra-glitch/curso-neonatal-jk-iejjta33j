export type Question = {
  id: string
  text: string
  options: string[]
  correctIndex: number
}

export type LessonType = 'text' | 'video' | 'interactive' | 'quiz'

export type Lesson = {
  id: string
  title: string
  type: LessonType
  content?: string
  imageUrl?: string
  videoUrl?: string
  questions?: Question[]
  pdfUrl?: string
}

export type Module = {
  id: string
  title: string
  description: string
  duration: string
  lessons: Lesson[]
  thumbnail: string
}

export const COURSE_DATA: Module[] = [
  {
    id: 'm1',
    title: 'Módulo 1: Introdução à UTI Neonatal',
    description:
      'Visão geral dos equipamentos, protocolos de higiene e rotina da unidade de terapia intensiva neonatal.',
    duration: '45 min',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=hospital%20incubator&color=blue',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Estrutura e Protocolos',
        type: 'text',
        content:
          'A UTI Neonatal do HJK é equipada para atender recém-nascidos de alto risco. O controle rigoroso de infecção é a primeira e mais importante barreira. A lavagem das mãos deve seguir o protocolo dos 5 momentos da OMS.',
        imageUrl: 'https://img.usecurling.com/p/800/400?q=hand%20washing%20hospital',
        pdfUrl: '/protocolo-higiene.pdf',
      },
      {
        id: 'm1-l2',
        title: 'Demonstração de Paramentação',
        type: 'video',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        content:
          'Assista ao vídeo demonstrativo da paramentação correta antes de entrar no leito do paciente.',
      },
      {
        id: 'm1-l3',
        title: 'Verificação de Aprendizado',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            text: 'Qual é o primeiro momento para a higiene das mãos segundo a OMS?',
            options: [
              'Após o contato com o paciente',
              'Antes de tocar o paciente',
              'Após risco de exposição a fluidos corporais',
              'Antes de realizar procedimento limpo/asséptico',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: 'Módulo 2: Cuidados Respiratórios',
    description:
      'Manejo de vias aéreas, oxigenoterapia e ventilação mecânica não invasiva no recém-nascido.',
    duration: '1h 15m',
    thumbnail: 'https://img.usecurling.com/p/400/300?q=baby%20oxygen&color=green',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Princípios da Oxigenoterapia',
        type: 'interactive',
        content:
          'O uso de oxigênio deve ser criterioso para evitar retinopatia da prematuridade. Clique nos cards para revisar os limites de saturação alvo por idade gestacional.',
        imageUrl: 'https://img.usecurling.com/p/800/400?q=neonatal%20monitor',
      },
      {
        id: 'm2-l2',
        title: 'Avaliação Respiratória',
        type: 'quiz',
        questions: [
          {
            id: 'q2',
            text: 'Qual o principal risco do uso indiscriminado de oxigênio em prematuros extremos?',
            options: ['Hipoglicemia', 'Retinopatia da prematuridade', 'Taquicardia', 'Hipotermia'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
]

export const ALL_LESSONS = COURSE_DATA.flatMap((m) => m.lessons)
