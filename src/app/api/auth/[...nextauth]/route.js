import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { connectDB } from '@/lib/database/connectDb'
import User from '@/database/model/User'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    // Called when user signs in
    async signIn({ user, account, profile }) {
      await connectDB()
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: user.email })

      if (!existingUser) {
        // Create new user
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        })
      }

      return true
    },

    // Add custom data to session
    async session({ session }) {
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })

      // console.log("dbUser",dbUser)

      session.user._id = dbUser._id.toString()
      session.user.name = dbUser.name
      session.user.image = dbUser.image

      return session
    },
  }
})

export { handler as GET, handler as POST }
