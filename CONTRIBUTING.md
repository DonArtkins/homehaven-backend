# Contributing to HomeHaven Backend

We love your input! We want to make contributing to HomeHaven Backend as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any Contributions You Make Will Be Under the Apache 2.0 Software License

In short, when you submit code changes, your submissions are understood to be under the same [Apache 2.0 License](LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report Bugs Using GitHub's [Issue Tracker](https://github.com/your-org/homehaven-backend/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/your-org/homehaven-backend/issues/new); it's that easy!

## Write Bug Reports With Detail, Background, and Sample Code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Setup

### Prerequisites

- Node.js 16+
- MongoDB 5.0+
- Git

### Local Development

1. **Fork the repository**

   ```bash
   git clone https://github.com/your-org/homehaven-backend.git
   cd homehaven-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Code Style

We use ESLint and Prettier for code formatting. Please ensure your code follows our style guidelines:

```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix
```

## Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable.
2. Update the documentation for new endpoints or modified behavior.
3. Add tests for new functionality.
4. Ensure all tests pass before submitting.
5. Squash your commits into logical units of work.
6. Follow the PR template when creating your pull request.

## PR Template

```markdown
## Description

Brief description of the changes

## Type of change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?

Describe the tests that you ran to verify your changes.

## Checklist:

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## API Development Guidelines

### Adding New Endpoints

1. Create Model (if needed) in `models/`
2. Create Controller in `controllers/`
3. Create Routes in `routes/`
4. Add Middleware if required
5. Update Documentation

### Error Handling

- Use consistent error response format
- Include appropriate HTTP status codes
- Log errors for debugging
- Don't expose sensitive information

### Security Considerations

- Validate all inputs
- Use parameterized queries
- Implement proper authentication
- Follow principle of least privilege

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- path/to/test/file.js
```

### Writing Tests

- Write tests for new functionality
- Ensure edge cases are covered
- Mock external dependencies
- Test both success and failure scenarios

## Documentation

- Update README.md for significant changes
- Document new API endpoints
- Include examples for complex functionality
- Keep code comments up to date

## Community

### Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Questions?

Feel free to:

- Open an issue for bugs or feature requests
- Join our Discord community
- Email the maintainers at dev@homehaven.com

## Recognition

Contributors who have significantly helped the project will be added to the contributors list in the README.

Thank you for contributing to HomeHaven!
