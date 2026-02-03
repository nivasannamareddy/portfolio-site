import React from 'react'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'

const previewUrl = 'https://portfolio-site-kh7fo12dx-nivasannamareddys-projects.vercel.app/'

const PreviewPane = () =>
  React.createElement('iframe', {
    title: 'Live Preview',
    src: previewUrl,
    style: { width: '100%', height: '100%', border: 0 },
  })

const defaultDocumentNode = (S) =>
  S.document().views([S.view.form(), S.view.component(PreviewPane).title('Preview')])

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio Content',
  projectId: 'mm04qxk5',
  dataset: 'production',
  plugins: [
    deskTool({ defaultDocumentNode }),
    presentationTool({ previewUrl }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
