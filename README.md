# Emerald

Demonstration ad campaign management app built with React, TypeScript, and Vite.

## Features

**CRUD operations** - creating, editing, viewing and deleting advertisement campaigns.

## Tech Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite

## API Integration

The application expects a backend API with the following endpoints:

- `GET /api/campaigns` - Fetch all campaigns
- `GET /api/campaigns/:id` - Fetch campaign by ID
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign
- `GET /api/balance` - Get demo account balance
- `PUT /api/balance?value=<amount>` - Update demo account balance
