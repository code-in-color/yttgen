import type { Platform } from '@common/types'
import { api } from '@server/api/api'
import { useForm } from 'react-hook-form'

interface AddProfileForm {
  platform: Platform
  url: string
}

const AddPublicProfilePage = () => {
  const addProfileMut = api.youtube.addProfile.useMutation()
  const { handleSubmit, register } = useForm<AddProfileForm>()

  return (
    <form
      onSubmit={
        void handleSubmit(async (data) => {
          try {
            await addProfileMut.mutateAsync({
              platform: data.platform,
              url: data.url
            })
          } catch (err) {
            console.error('Could not add profile.', err)
          }
        })
      }
    >
      <div>
        <label className="block" htmlFor="platform">
          Social Media Platform
        </label>
        <input className="text-black" type="text" {...register('platform')} />
      </div>
      <div>
        <label className="block" htmlFor="url">
          Social Media URL
        </label>
        <input className="text-black" type="text" {...register('url')} />
      </div>
      <button type="submit">Add Profile</button>
    </form>
  )
}
export default AddPublicProfilePage
