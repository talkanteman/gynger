# SaaS Bills Manager

A full-stack application for managing and deduplicating SaaS bills from CSV files.

## Features

- Upload and process CSV files containing SaaS bills
- Automatic deduplication of bills based on:
  - Exact amount matching
  - Exact date matching
  - Vendor name matching with fuzzy logic:
    - Case-insensitive exact matches
    - One extra letter (e.g., "Braze" and "braaze")
    - One less letter (e.g., "braze" and "brze")
    - One different letter (e.g., "Braze" and "Blaze")
- Real-time validation of bill data
- Modern React frontend with Material-UI
- Fastify backend with TypeScript
- In-memory storage for bill management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/talkanteman/gynger.git
cd saas-bills-manager
```

2. Install dependencies for both client and server:
```bash
npm run install-all
```

## Running the Application

1. Start both client and server:
```bash
npm start
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:3001

## CSV File Format

The application expects CSV files with the following format:

```csv
Amount,Vendor Name,Date
299.00,Slack,2024-03-01
49.99,GitHub Team,2024-03-01
```

Requirements:
- Amount: Must be a positive number
- Vendor Name: Required, non-empty string
- Date: Must be in YYYY-MM-DD format

## Testing

The `testFiles` directory contains sample CSV files for testing:

1. `test-bills.csv`: Contains test cases for vendor name matching
   - Tests case-insensitive matching
   - Tests one-letter differences
   - Tests extra/missing letters

2. `error-test-bills.csv`: Contains test cases for error handling
   - Invalid amounts
   - Missing required fields
   - Invalid date formats
   - Duplicate entries

## API Endpoints

### GET /bills
- Returns all bills in memory
- Response format:
  ```json
  {
    "bills": [
      {
        "id": "uuid",
        "amount": 299.00,
        "date": "2024-03-01",
        "vendorName": "Slack"
      }
    ]
  }
  ```

### POST /bills
- Uploads and processes a CSV file
- Request: multipart/form-data with a CSV file
- Response format:
  ```json
  {
    "bills": [
      {
        "id": "uuid",
        "amount": 299.00,
        "date": "2024-03-01",
        "vendorName": "Slack"
      }
    ],
    "errors": [
      "Invalid amount: invalid",
      "Missing vendor name",
      "Invalid date format: invalid-date"
    ]
  }
  ```

## Error Handling

The application handles various error cases:
- Invalid CSV format
- Missing required fields
- Invalid amount values (non-numeric, negative, zero)
- Invalid date formats
- Memory storage errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 