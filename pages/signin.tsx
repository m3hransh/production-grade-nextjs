import React, { FC, useEffect } from 'react'
import { Pane, majorScale, Text, Spinner } from 'evergreen-ui'
import { providers, signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Logo from '../components/logo'

import SocialButton from '../components/socialButton'

const Signin: FC<{ authTypes: { [key: string]: any } }> = ({ authTypes }) => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/app')
    }
  }, [session, router])

  return (
    <Pane height="100vh" width="100vw" display="flex">
      <Pane
        height="100%"
        width="50%"
        borderRight
        paddingX={majorScale(8)}
        paddingY={majorScale(5)}
        background="#47B881"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pane>
          <Logo color="white" fontSize="60px" />
          <Pane marginTop={majorScale(2)}>
            <Text color="white" fontSize="22px">
              Sign in.
            </Text>
          </Pane>
          {loading ? (
            <Pane>
              <Spinner />
            </Pane>
          ) : null}
        </Pane>
      </Pane>
      <Pane
        height="100%"
        width="50%"
        background="tint2"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={majorScale(7)}
      >
        {Object.values(authTypes).map((provider) => (
          <Pane key={provider.name} width="100%" textAlign="center">
            <SocialButton type={provider.id} onClick={() => signIn(provider.id)} />
          </Pane>
        ))}
      </Pane>
    </Pane>
  )
}

export async function getStaticProps(context) {
  return {
    props: { authTypes: await providers(context) },
  }
}

export default Signin