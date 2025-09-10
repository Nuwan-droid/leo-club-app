import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Donation from '../Components/Pages/Donation';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the lion image import
jest.mock('../../assets/DonateImages/Lion.png', () => 'lion-image-mock');

// Mock fetch globally
global.fetch = jest.fn();

// Helper function to render component with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock alert
global.alert = jest.fn();

// Suppress console logs and errors
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

describe('Donation Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
    global.alert.mockClear();
  });

  // --------------------------
  // Component Rendering Tests
  // --------------------------
  describe('Component Rendering', () => {
    test('renders main heading and description', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] }),
      });

      await act(async () => renderWithRouter(<Donation />));

      expect(screen.getByText('Make a Donation')).toBeInTheDocument();
      expect(screen.getByText(/The Leo Club of Uva Wellassa University/)).toBeInTheDocument();
    });

    test('renders top navigation cards', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] }),
      });

      await act(async () => renderWithRouter(<Donation />));

      expect(screen.getByText('Donate for Schedule Projects')).toBeInTheDocument();
      expect(screen.getByText('Donate Club Funds')).toBeInTheDocument();
    });

    test('shows schedule section by default', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] }),
      });

      await act(async () => renderWithRouter(<Donation />));

      await waitFor(() =>
        expect(screen.getByText('No donation projects available at the moment.')).toBeInTheDocument()
      );
    });
  });

  // --------------------------
  // API Integration Tests
  // --------------------------
  describe('API Integration', () => {
    test('displays loading state initially', async () => {
      fetch.mockImplementationOnce(() => new Promise(() => {})); // Never resolves

      renderWithRouter(<Donation />);

      expect(screen.getByText('Loading donation projects...')).toBeInTheDocument();
    });

    test('fetches and displays donation projects successfully', async () => {
      const mockProjects = [
        {
          _id: '1',
          title: 'School Supply Drive',
          description: 'Helping local schools',
          start_date: '2024-01-01',
          end_date: '2024-02-01',
          location: 'Local School',
          city: 'Badulla',
          donation_items: { books: { required: 100, received: 25 } },
          image_path: 'test-image.jpg',
        },
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: mockProjects }),
      });

      await act(async () => renderWithRouter(<Donation />));

      await waitFor(() => {
        expect(screen.getByText('School Supply Drive')).toBeInTheDocument();
        expect(screen.getByText('Helping local schools')).toBeInTheDocument();
        expect(screen.getByText('Required: 100')).toBeInTheDocument();
        expect(screen.getByText('Received: 25')).toBeInTheDocument();
      });
    });

    test('handles API error gracefully', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await act(async () => renderWithRouter(<Donation />));

      await waitFor(() =>
        expect(screen.getByText('Error: Network error')).toBeInTheDocument()
      );
    });

    test('handles non-ok response', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

      await act(async () => renderWithRouter(<Donation />));

      await waitFor(() =>
        expect(screen.getByText('Error: Failed to fetch donation projects')).toBeInTheDocument()
      );
    });

    test('handles array response format', async () => {
      const mockProjects = [
        { _id: '1', title: 'Test Project', description: 'Test description', donation_items: { books: { required: 10, received: 5 } } },
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects,
      });

      await act(async () => renderWithRouter(<Donation />));

      await waitFor(() =>
        expect(screen.getByText('Test Project')).toBeInTheDocument()
      );
    });
  });

  // --------------------------
  // Navigation & Section Switching
  // --------------------------
  describe('Navigation and Section Switching', () => {
    test('switches to club funds section when clicked', async () => {
      fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true, data: [] }) });

      await act(async () => renderWithRouter(<Donation />));

      fireEvent.click(screen.getByText('Donate Club Funds'));

      expect(screen.getByText('Club General Fund')).toBeInTheDocument();
      expect(screen.getByText('Rs.54,450')).toBeInTheDocument();
    });

    test('switches back to schedule section', async () => {
      fetch.mockResolvedValue({ ok: true, json: async () => ({ success: true, data: [] }) });

      await act(async () => renderWithRouter(<Donation />));

      fireEvent.click(screen.getByText('Donate Club Funds'));
      fireEvent.click(screen.getByText('Donate for Schedule Projects'));

      await waitFor(() =>
        expect(screen.getByText('No donation projects available at the moment.')).toBeInTheDocument()
      );
    });
  });

  // --------------------------
  // Add more tests for details, navigation actions, images, club funds, and edge cases
  // --------------------------
  // You can continue your existing tests here, the console suppression will apply globally
});
