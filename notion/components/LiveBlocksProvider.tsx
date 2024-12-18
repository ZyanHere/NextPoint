'use client'

import { LiveblocksProvider} from "@liveblocks/react/suspense"
function LiveBlocksProvider({children} : {
    children: React.ReactNode
}) {

    if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY){
        throw new Error('Missing public key for Live Blocks. Please set NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY in your environment variables.')
    }

  return (
    <LiveblocksProvider
        throttle={16}
        authEndpoint={'/auth-endpoint'}
        >{children}
    </LiveblocksProvider>
  )
}

export default LiveBlocksProvider