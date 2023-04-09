import { api } from '@server/api/api'
import type { NextPage } from 'next'
import { type SubmitHandler, useForm } from 'react-hook-form'

interface FormInput {
  title: string
  contentUrl: string
}

const AddPost: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<FormInput>()
  const addPostMut = api.youtube.addPost.useMutation()

  const onSubmit: SubmitHandler<FormInput> = (data, e) => {
    e?.preventDefault()

    try {
      console.log('Adding post')
      addPostMut.mutate({
        title: data.title,
        contentUrl: data.contentUrl
      })
      console.log('Post added')
      reset()
    } catch (err) {
      console.error('Failed to add post.', err)
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="text-black" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="hippo-eagle-datsun" {...register('title')} />
      {errors.title && <span>You need a title, bruh</span>}
      <input
        placeholder="https://google.com"
        {...register('contentUrl', { required: true })}
      />

      {errors.contentUrl && (
        <span>You must point to a URL for your content, bruh</span>
      )}

      <button
        className="cursor-pointer border border-yellow-400 px-4 py-2 text-slate-50"
        type="submit"
        disabled={!isValid}
      >
        Add Post
      </button>
    </form>
  )
}

export default AddPost
