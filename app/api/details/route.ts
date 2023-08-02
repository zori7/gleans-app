import { NextResponse } from 'next/server'
import {faker} from "@faker-js/faker";

export async function GET() {
    return NextResponse.json({
        title: faker.word.words({
            count: {
                min: 3,
                max: 7
            }
        }),
        description: faker.word.words({
            count: {
                min: 20,
                max: 40
            }
        }),
        emoji: faker.internet.emoji(),
        tags: faker.word.words(5).split(" ")
    }, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}
