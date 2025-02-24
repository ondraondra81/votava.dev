import EditSkillPage from '../[id]/edit/page'

export default function NewSkillPage() {
    return <EditSkillPage params={Promise.resolve({ id: 'new' })} />
}