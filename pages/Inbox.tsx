/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import Head from 'next/head';
import React from 'react';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import ChatRoom from '../components/InboxPage/ChatRoom';
import CreateChatRoom from '../components/InboxPage/CreateChatRoom';
import SendMessage from '../components/InboxPage/SendMessage';
import LoadingPage from '../components/loadingComps/LoadingPage';
import NewMessageSVG from '../components/svgComps/NewMessageSVG';
import Header from '../components/header/Header';
import atoms from '../util/atoms';
import LoadingChatRooms from '../components/loadingComps/LoadingChatRooms';

const Inbox: NextPage = () => {
  const [userStatus] = useAtom(atoms.userStatus);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [chatRoomLoading, setChatRoomLoading] = useAtom(atoms.chatRoomLoading);

  const [activeChat, setActiveChat] = React.useState('');
  const [createChatRoom, setCreateChatRoom] = React.useState(false);

  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }

  return (
    <div className="h-screen cursor-default overflow-y-scroll bg-[#fafafa] text-[#231f20] dark:bg-[#131313] dark:text-slate-100 dark:[color-scheme:dark]">
      <Head>
        <title>Instagram • Chats</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header page="Inbox" />
      {createChatRoom ? (
        <CreateChatRoom setCreateChatRoom={setCreateChatRoom} />
      ) : (
        <div />
      )}
      <div className="relative mx-auto mt-4 h-[calc(100%-90px)] max-w-[935px] border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c]">
        <div className="flex h-[60px] w-[120px] items-center border-b border-stone-300 dark:border-stone-700 md:w-[350px] md:px-5">
          <h1 className="mx-auto">{userDetails.displayName}</h1>
          <button
            onClick={() => setCreateChatRoom(!createChatRoom)}
            type="button"
          >
            <NewMessageSVG />
          </button>
        </div>
        {activeChat === '' ? (
          <SendMessage setCreateChatRoom={setCreateChatRoom} />
        ) : (
          <div />
        )}
        <div className="h-[calc(100%-60px)] w-[120px] overflow-y-auto overflow-x-hidden dark:[color-scheme:dark] md:w-[350px]">
          <div
            className={chatRoomLoading ? 'h-0 overflow-hidden' : ''}
            onLoad={() => setChatRoomLoading(false)}
          >
            {userNotifications.chatRoomIds?.map((chatRoomId, index) => (
              <div
                key={`chatRoomKey${index}`}
                onClick={() => setActiveChat(`chatRoom${index}`)}
                role="button"
                tabIndex={0}
              >
                <ChatRoom
                  chatRoomID={chatRoomId}
                  userID={userDetails.displayName!}
                  activeChat={activeChat}
                  activeChatId={`chatRoom${index}`}
                />
              </div>
            ))}
          </div>
          {chatRoomLoading ? <LoadingChatRooms /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
