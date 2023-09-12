import React, { useEffect, useState } from 'react';
import styles from '../../Styles';

import { PageScroll } from '../../Components/PageScroll';
import { Text } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';

import { MessagingModal } from './MessagingModal';
import { MessageSentModal } from './MessageSentModal';
import { AddedToMessageListModal } from './AddedToMessageListModal';
import { ConnectingModal } from './ConnectingModal';
import { RejectingModal } from './RejectingModal';

import { Dimensions, View, Modal, TouchableOpacity, Image } from 'react-native';

export const SwipeTherapistModalFlow = props => {
  return (
    <Modal visible={props.visible} transparent={true} animationType={'fade'}>
      <PageScroll backgroundColor="rgba(0,0,0,0.8)">
        <View style={[styles.paddingH20]}>
          {props.modalToShow === 'messaging' && (
            <MessagingModal
              currentTherapistObj={props.currentTherapistObj}
              setModalToShow={props.setModalToShow}
              messageToTherapist={props.messageToTherapist}
              setMessageToTherapist={props.setMessageToTherapist}
              sendMessage={props.sendMessage}
              addToMessageList={props.addToMessageList}
            />
          )}

          {/* User sent a message */}
          {props.modalToShow === 'message sent' && (
            <MessageSentModal
              currentTherapistObj={props.currentTherapistObj}
              setModalToShow={props.setModalToShow}
              setModalFlowOpen={props.setModalFlowOpen}
            />
          )}

          {/* User added therapist to message list */}
          {props.modalToShow === 'added to message list' && (
            <AddedToMessageListModal
              currentTherapistObj={props.currentTherapistObj}
              setModalToShow={props.setModalToShow}
              setModalFlowOpen={props.setModalFlowOpen}
            />
          )}

          {/* User pressed back on the messaging modal */}
          {props.modalToShow === 'connecting' && (
            <ConnectingModal
              currentTherapistObj={props.currentTherapistObj}
              undoSelection={props.undoSelection}
              addToMessageList={props.addToMessageList}
              dontShowConnectingPage={props.dontShowConnectingPage}
              setDontShowConnectingPage={props.setDontShowConnectingPage}
            />
          )}

          {props.modalToShow === 'rejecting' && (
            <RejectingModal
              currentTherapistObj={props.currentTherapistObj}
              undoSelection={props.undoSelection}
              rejectTherapist={props.rejectTherapist}
              dontShowRejectingPage={props.dontShowRejectingPage}
              setDontShowRejectingPage={props.setDontShowRejectingPage}
            />
          )}
        </View>
      </PageScroll>
    </Modal>
  );
};
