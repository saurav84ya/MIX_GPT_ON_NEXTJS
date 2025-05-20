import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { connectDB } from '@/lib/database/connectDb'
import User from '@/database/model/User'
import GoogleProvider from 'next-auth/providers/google'


const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB()
      const existingUser = await User.findOne({ email: user.email })
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        })
      }
      return true
    },
    async session({ session }) {
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })
      session.user._id = dbUser._id.toString()
      session.user.name = dbUser.name
      session.user.image = dbUser.image
      return session
    }
  }
})

export { handler as GET, handler as POST }