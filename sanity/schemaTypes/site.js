export default {
  name: 'site',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'meta',
      title: 'Meta',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
      ],
    },
    {
      name: 'personal',
      title: 'Personal',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'typed', title: 'Typed Words', type: 'array', of: [{ type: 'string' }] },
        { name: 'title', title: 'Role Title', type: 'string' },
        { name: 'location', title: 'Location', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'resumeUrl', title: 'Resume URL', type: 'string' },
        { name: 'avatar', title: 'Avatar URL', type: 'string' },
        { name: 'status', title: 'Status', type: 'string' },
        { name: 'bio', title: 'Bio', type: 'text' },
      ],
    },
    {
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'email', title: 'Email Link', type: 'string' },
      ],
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category', type: 'string' },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'level', title: 'Level', type: 'number' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'period', title: 'Period', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'impact', title: 'Impact', type: 'string' },
            { name: 'category', title: 'Category', type: 'string' },
            {
              name: 'tech',
              title: 'Tech',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'links',
              title: 'Links',
              type: 'object',
              fields: [
                { name: 'demo', title: 'Demo URL', type: 'url' },
                { name: 'repo', title: 'Repo URL', type: 'url' },
              ],
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', title: 'Type', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'org', title: 'Organization', type: 'string' },
            { name: 'period', title: 'Period', type: 'string' },
            { name: 'location', title: 'Location', type: 'string' },
            { name: 'bullets', title: 'Bullets', type: 'array', of: [{ type: 'string' }] },
            { name: 'tech', title: 'Tech', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', title: 'Quote', type: 'text' },
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'role', title: 'Role', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'location', title: 'Location', type: 'string' },
        { name: 'availability', title: 'Availability', type: 'string' },
        { name: 'webhook', title: 'Webhook', type: 'string' },
        {
          name: 'emailProvider',
          title: 'Email Provider',
          type: 'object',
          fields: [
            { name: 'serviceId', title: 'Service ID', type: 'string' },
            { name: 'templateId', title: 'Template ID', type: 'string' },
            { name: 'replyTemplateId', title: 'Reply Template ID', type: 'string' },
            { name: 'publicKey', title: 'Public Key', type: 'string' },
            { name: 'toEmail', title: 'To Email', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'object',
      fields: [
        { name: 'accent', title: 'Accent', type: 'string' },
        { name: 'secondary', title: 'Secondary', type: 'string' },
      ],
    },
  ],
}
