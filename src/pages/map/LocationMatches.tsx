import React from 'react'
import styled from 'styled-components'
import { Match } from '../../Interfaces'
import { displayDate } from '../../services/dateService'

const Wrapper = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`

const Venue = styled.div`
`

const VenueName = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
`

const MatchDiv = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #1f2833;
`

const DateLeague = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Teams = styled.div`
    display: flex;
    flex-direction
`

const Home = styled.span`
    flex: 3;
    text-align: leaft;
`

const Away = styled.span`
    flex: 3;
    text-align: right;
`

const Score = styled.span`
    flex: 1;
    text-align: center;
`


interface Props {
    matches: Match[];
}

export default function LocationMatches({ matches }: Props) {

    function venues() {
        const venues: string[] = new Set([])
        matches.map((m: Match) => venues.add(m.venue))
        return Array.from(venues)
    }

    function displayName(name: string, size: number): string {
        if (name.length > size) {
            return name.slice(0,size) + '...'
        }
        return name
    }

    return (
        <Wrapper>
            {venues().map((venue: String) =>
            <Venue key={venue}>
                <VenueName>
                {venue}
                </VenueName>
            {matches.filter(m => m.venue === venue).map(match => 
            <MatchDiv key={match.id}>
                <DateLeague>
                    <span>{displayDate(match.date)} {match.time}</span>
                    <span>{match.league}</span>
                </DateLeague>
                <Teams>
                    <Home>{displayName(match.hometeam, 12)}</Home>
                    <Score>{match.score.split(' (')[0]}</Score>
                    <Away>{displayName(match.awayteam, 12)}</Away>
                </Teams>
            </MatchDiv>
            )}
            </Venue>
            )}
        </Wrapper>
    )
}
