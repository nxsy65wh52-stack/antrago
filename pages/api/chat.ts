import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

const systemPrompt = `
أنت مساعد ذكي متخصص في شرح الأوراق والمعاملات الحكومية في ألمانيا.
هدفك الوحيد هو: شرح وتبسيط النصوص الرسمية للمستخدم، بلغة سهلة.
لا تعبئ استمارات – لا تعطي استشارة قانونية – لا تتخذ قرارات.
في نهاية كل رد، أضف التنبيه: هذا شرح فقط لأغراض الفهم، وليس استشارة قانونية.
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ]
  })

  res.status(200).json({ reply: response.choices[0].message.content })
}
