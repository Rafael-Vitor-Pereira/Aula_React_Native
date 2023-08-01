import { Button as PaperButton, Dialog, Portal, Text } from 'react-native-paper';

const CustomDialog = ({visible, titulo, mensagem, onClose}) => {
	return(
		<Portal>
			<Dialog visible={visible} onDismiss={() => onClose(false)}>
				<Dialog.Title>{titulo}</Dialog.Title>
				<Dialog.Content>
					<Text variant="bodyMedium">{mensagem}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<PaperButton onPress={() => onClose(false)}>Done</PaperButton>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	)
}

export default CustomDialog