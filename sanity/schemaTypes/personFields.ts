// /sanity/schemaTypes/personFields.ts

export const personFields = [
  {
    name: 'name',
    title: 'Name',
    type: 'string',
  },
  {
    name: 'role',
    title: 'Role',
    type: 'string',
  },
  {
    name: 'bio',
    title: 'Bio',
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        lists: [{ title: 'Bullet', value: 'bullet' }],
      },
    ],
  },
  {
    name: 'image',
    title: 'Image',
    type: 'image',
  },
  {
    name: 'socials',
    title: 'Social Media',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          {
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
              list: ['facebook', 'twitter', 'instagram', 'whatsapp', 'linkedin'],
            },
          },
          {
            name: 'url',
            title: 'URL',
            type: 'url',
          },
        ],
      },
    ],
  },
  {
    name: 'contactNumber',
    title: 'Contact Number',
    type: 'string', // Added for easier communication
  },
  {
    name: 'email',
    title: 'Email',
    type: 'string', // Added for easier communication
  },
  {
    name: 'dateJoined',
    title: 'Date Joined',
    type: 'datetime', // Track when the person joined the church or the ministry
  },
];

      