
import { CardInTableDown, CardInTableRight, CardInTableLeft, CardInTableTop } from "./tableStyle";

function RenderPlayedCard({playedCard,getCardPlayed}) {

    if (playedCard ) {
        const currentUser = JSON.parse(localStorage.getItem('usuarioLogado')).idv4;
        const positionUser = JSON.parse(localStorage.getItem('usuarioLogado')).position;

        return playedCard.map((cardInfo, index) => {


            if (cardInfo) {
                const { player, card, position } = cardInfo;

                const cardElement = getCardPlayed(card);

             

                if (positionUser === 'top') {
                    if (player === currentUser) {

                        return (

                            <CardInTableDown key={index}>
                                {cardElement}
                            </CardInTableDown>

                        );
                    }
                    if (position === 'left') {
                        return (
                            <CardInTableRight key={index}>
                                {cardElement}
                            </CardInTableRight>
                        );

                    }
                    if (position === 'down') {
                        return (
                            <CardInTableTop key={index} >
                                {cardElement}
                            </CardInTableTop>
                        );
                    }
                    if (position === 'right') {

                        return (
                            <CardInTableLeft key={index}>
                                {cardElement}
                            </CardInTableLeft>
                        );
                    }

                }

                
                if (positionUser === 'down') {
                    if (player === currentUser) {

                        return (

                            <CardInTableDown key={index}>
                                {cardElement}
                            </CardInTableDown>

                        );
                    }
                    if (position === 'right') {
                        return (
                            <CardInTableRight key={index}>
                                {cardElement}
                            </CardInTableRight>
                        );

                    }
                    if (position === 'top') {
                        return (
                            <CardInTableTop key={index} >
                                {cardElement}
                            </CardInTableTop>
                        );
                    }
                    if (position === 'left') {

                        return (
                            <CardInTableLeft key={index}>
                                {cardElement}
                            </CardInTableLeft>
                        );
                    }

                }
                
                if (positionUser === 'right') {
                    if (player === currentUser) {

                        return (

                            <CardInTableDown key={index}>
                                {cardElement}
                            </CardInTableDown>

                        );
                    }
                    if (position === 'top') {
                        return (
                            <CardInTableRight key={index}>
                                {cardElement}
                            </CardInTableRight>
                        );

                    }
                    if (position === 'left') {
                        return (
                            <CardInTableTop key={index} >
                                {cardElement}
                            </CardInTableTop>
                        );
                    }
                    if (position === 'down') {

                        return (
                            <CardInTableLeft key={index}>
                                {cardElement}
                            </CardInTableLeft>
                        );
                    }

                }
                
                if (positionUser === 'left') {
                    if (player === currentUser) {

                        return (

                            <CardInTableDown key={index}>
                                {cardElement}
                            </CardInTableDown>

                        );
                    }
                    if (position === 'down') {
                        return (
                            <CardInTableRight key={index}>
                                {cardElement}
                            </CardInTableRight>
                        );

                    }
                    if (position === 'right') {
                        return (
                            <CardInTableTop key={index} >
                                {cardElement}
                            </CardInTableTop>
                        );
                    }
                    if (position === 'top') {

                        return (
                            <CardInTableLeft key={index}>
                                {cardElement}
                            </CardInTableLeft>
                        );
                    }

                }


                return null;
            }
        });
    }
    return null;
};

export default RenderPlayedCard