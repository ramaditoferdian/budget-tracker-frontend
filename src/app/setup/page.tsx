'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TransactionTypePanel from '@/modules/settings/components/TransactionTypePanel'
import CategoryPanel from '@/modules/settings/components/CategoryPanel'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const SetupPage = () => {
  const [sourceName, setSourceName] = useState('')
  const [typeName, setTypeName] = useState('')
  const [categoryName, setCategoryName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted values:', { sourceName, typeName, categoryName })
    // TODO: Call APIs to store initial setup values
  }

  return (
    <main className="min-h-screen bg-muted px-4 py-10 flex items-center justify-center">
      <div
        className="w-full max-w-2xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">🚀 Getting Started</h1>
        <p className="text-center text-muted-foreground">
          Let`s setup your budget tracker in a few quick steps.
        </p>

        <Card className="shadow-none border-muted">
          <CardHeader>
            <CardTitle>💰 Source of Funds</CardTitle>
          </CardHeader>
          <CardContent className=''>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Add your Transaction Type</AccordionTrigger>
                <AccordionContent>
                  <TransactionTypePanel />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Add your Category</AccordionTrigger>
                <AccordionContent>
                  <CategoryPanel />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        

        <div className="text-center">
          <Button type="submit" className="w-full max-w-sm">
            Save & Continue
          </Button>
        </div>
      </div>
    </main>
  )
}

export default SetupPage
