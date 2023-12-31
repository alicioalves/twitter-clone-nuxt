import formidable from 'formidable'
import { createTweet } from '../../../db/tweets'
import { createMediaFile } from '../../../db/mediaFiles'
import { tweetTransformer } from '../../../transformers/tweet'
import { uploadToCloudinary } from '../../../utils/cloudinary'

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err)
      }
      resolve({ fields, files })
    })
  })

  const { fields, files } = response

  const userId = event.context?.auth?.user?.id

  const tweetData = {
    text: fields.text.toString(),
    authorId: userId
  }

  const tweet = await createTweet(tweetData)

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key]

    file.forEach(async (f) => {
      const cloudinaryResource = await uploadToCloudinary(f.filepath)
      return createMediaFile({
        url: cloudinaryResource.secure_url,
        providerPublicId: cloudinaryResource.public_id,
        userId: userId,
        tweetId: tweet.id
      })
    })
  })

  await Promise.all(filePromises)

  return {
    tweet: tweetTransformer(tweet)
  }
})
