import {FC, useCallback, useLayoutEffect, useState} from "react";

interface Props {
	text: string
	setText: (text: string) => void
}

export const MessageInput: FC<Props> = ({text, setText}) => {
	type TSelectionState = { node: Node | null; offset: number };
	const [selection, setSelection] = useState<TSelectionState>({node: null, offset: 0});
	const isPlaceholderNeeded = text === ''
	const placeholder = 'Enter message'

	const saveSelection = useCallback(() => {
		const currentSelection = document.getSelection();
		if (!currentSelection) return;

		setSelection({
			node: currentSelection.anchorNode,
			offset: currentSelection.anchorOffset,
		});
	}, []);

	useLayoutEffect(() => {
		const {node, offset} = selection;
		if (!node) return;

		const range = new Range();
		range.setStart(node, offset);
		range.setEnd(node, offset);

		document.getSelection()?.removeAllRanges();
		document.getSelection()?.addRange(range);
	});

	return (
			<form className="w-full flex items-center justify-between p-2 shadow-2xl fixed bottom-0">
				{isPlaceholderNeeded && (
						<div className="text-neutral-500 absolute m-2" aria-hidden>
							{placeholder}
						</div>
				)}
				<div
						contentEditable
						suppressContentEditableWarning
						role="textbox"
						className="whitespace-pre-wrap break-words w-full p-2 z-10 pr-12"
						placeholder="Add a message"
						{...(isPlaceholderNeeded && {'aria-label': placeholder})}
						onInput={({target}) => {
							saveSelection()
							setText((target as HTMLDivElement).innerText)
						}}>{text}</div>
				<button className="m-2 absolute right-2" type="submit">
					{text ?
							<svg className="text-inherit fill-current h-6" viewBox="0 0 24 24">
								<g clipPath="url(#clip0_627_2)">
									<path
											d="M23.939 12.0537C23.9389 12.2042 23.895 12.3513 23.8128 12.4768C23.7306 12.6023 23.6137 12.7007 23.4766 12.7596L1.57785 22.2395C1.38496 22.3229 1.17301 22.351 0.965352 22.3207C0.757689 22.2903 0.562353 22.2026 0.400845 22.0674C0.239337 21.9321 0.117918 21.7544 0.0499503 21.5539C-0.0180174 21.3534 -0.029898 21.1379 0.0156157 20.931L1.96986 12.0551L0.0167167 3.17948C-0.0291457 2.97239 -0.01747 2.75651 0.0504553 2.55568C0.118381 2.35486 0.239915 2.17688 0.401647 2.04138C0.56338 1.90589 0.759024 1.81816 0.96699 1.78786C1.17496 1.75756 1.38716 1.78588 1.58019 1.86968L23.4756 11.3489C23.6127 11.4079 23.7296 11.5062 23.8118 11.6317C23.894 11.7572 23.9378 11.9043 23.9379 12.0548L23.939 12.0537ZM3.35687 12.8217L1.66075 20.5312L19.4724 12.8207L3.35687 12.8217ZM19.4725 11.2851L1.6618 3.57685L3.35911 11.2861L19.4736 11.2862L19.4725 11.2851Z"
									/>
								</g>
								<defs>
									<clipPath id="clip0_627_2">
										<rect width="24" height="24" fill="white"/>
									</clipPath>
								</defs>
							</svg> :
							<svg className="text-inherit fill-current h-6" viewBox="0 0 24 24">
								<path
										d="M5.25 9.75C5.44891 9.75 5.63968 9.82902 5.78033 9.96967C5.92098 10.1103 6 10.3011 6 10.5V12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12V10.5C18 10.3011 18.079 10.1103 18.2197 9.96967C18.3603 9.82902 18.5511 9.75 18.75 9.75C18.9489 9.75 19.1397 9.82902 19.2803 9.96967C19.421 10.1103 19.5 10.3011 19.5 10.5V12C19.5 13.8593 18.8094 15.6523 17.5622 17.0312C16.3149 18.4101 14.6 19.2766 12.75 19.4625V22.5H17.25C17.4489 22.5 17.6397 22.579 17.7803 22.7197C17.921 22.8603 18 23.0511 18 23.25C18 23.4489 17.921 23.6397 17.7803 23.7803C17.6397 23.921 17.4489 24 17.25 24H6.75C6.55109 24 6.36032 23.921 6.21967 23.7803C6.07902 23.6397 6 23.4489 6 23.25C6 23.0511 6.07902 22.8603 6.21967 22.7197C6.36032 22.579 6.55109 22.5 6.75 22.5H11.25V19.4625C9.40003 19.2766 7.68506 18.4101 6.43782 17.0312C5.19058 15.6523 4.49998 13.8593 4.5 12V10.5C4.5 10.3011 4.57902 10.1103 4.71967 9.96967C4.86032 9.82902 5.05109 9.75 5.25 9.75Z"
								/>
								<path
										d="M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12V4.5C9 3.70435 9.31607 2.94129 9.87868 2.37868C10.4413 1.81607 11.2044 1.5 12 1.5C12.7956 1.5 13.5587 1.81607 14.1213 2.37868C14.6839 2.94129 15 3.70435 15 4.5V12ZM12 0C10.8065 0 9.66193 0.474106 8.81802 1.31802C7.97411 2.16193 7.5 3.30653 7.5 4.5V12C7.5 13.1935 7.97411 14.3381 8.81802 15.182C9.66193 16.0259 10.8065 16.5 12 16.5C13.1935 16.5 14.3381 16.0259 15.182 15.182C16.0259 14.3381 16.5 13.1935 16.5 12V4.5C16.5 3.30653 16.0259 2.16193 15.182 1.31802C14.3381 0.474106 13.1935 0 12 0V0Z"
								/>
							</svg>}
				</button>
			</form>
	)
}