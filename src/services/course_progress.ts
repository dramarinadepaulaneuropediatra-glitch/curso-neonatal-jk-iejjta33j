import pb from '@/lib/pocketbase/client'

export const getMyProgress = async (userId: string) => {
  try {
    const records = await pb
      .collection('course_progress')
      .getFullList({ filter: `user_id = '${userId}'` })
    return records.length > 0 ? records[0] : null
  } catch {
    return null
  }
}

export const createProgress = (data: any) => pb.collection('course_progress').create(data)
export const updateProgress = (id: string, data: any) =>
  pb.collection('course_progress').update(id, data)
export const getAllProgress = () =>
  pb.collection('course_progress').getFullList({ expand: 'user_id', sort: '-updated' })
