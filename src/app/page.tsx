'use client';

import type { Advocate } from './types';

import { useEffect, useState } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { formatPhoneNumber } from './utils';
export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    console.log('Fetching advocates...');

    const url = new URL('/api/advocates', window.location.origin);

    if (debouncedSearchTerm) {
      url.searchParams.set('search', debouncedSearchTerm.toLowerCase());
    }

    fetch(url).then((response) => {
      response
        .json()
        .then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
        })
        .catch((error) => {
          console.error('Error fetching advocates:', error);

          alert(
            'Sorry, there was an error fetching advocates. If this issue persists, please contact support.',
          );
        });
    });
  }, [debouncedSearchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchTerm('');
  };

  return (
    <div className="w-screen h-screen overflow-y-auto">
      <header className="sticky top-0">
        <div className="bg-emerald-950 p-4">
          <h1 className="text-2xl font-bold text-white">Solace Advocates</h1>
        </div>

        <form
          className="sticky top-0 mb-4 bg-gray-100 p-4 flex items-center justify-between"
          onSubmit={onSubmit}
          onReset={onReset}
        >
          <span>Searching for: </span>

          <input
            className="border-2 border-gray-300 rounded-md p-2 mx-2 flex-1"
            onChange={onChange}
            value={searchTerm}
          />

          <button
            type="reset"
            className="bg-yellow-600 px-4 py-2 rounded-md font-bold"
          >
            Reset Search
          </button>
        </form>
      </header>

      <main className="m-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 bg-gray-100 text-xs uppercase">First Name</th>
              <th className="p-2 bg-gray-100 text-xs uppercase">Last Name</th>
              <th className="p-2 bg-gray-100 text-xs uppercase">City</th>
              <th className="p-2 bg-gray-100 text-xs uppercase">Degree</th>
              <th className="p-2 bg-gray-100 text-xs uppercase">Specialties</th>
              <th className="p-2 bg-gray-100 text-xs uppercase">
                Years of Experience
              </th>
              <th className="p-2 bg-gray-100 text-xs uppercase">
                Phone Number
              </th>
            </tr>
          </thead>

          <tbody>
            {advocates.map((advocate) => (
              <tr key={advocate.id}>
                <td className="p-2 border-2 border-gray-100 align-top">
                  {advocate.firstName}
                </td>
                <td className="p-2 border-2 border-gray-100 align-top">
                  {advocate.lastName}
                </td>
                <td className="p-2 border-2 border-gray-100 align-top">
                  {advocate.city}
                </td>
                <td className="p-2 border-2 border-gray-100 align-top">
                  {advocate.degree}
                </td>
                <td className="p-2 border-2 border-gray-100 align-top">
                  <ul className="list-disc list-inside">
                    {advocate.specialties.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border-2 border-gray-100 align-top">
                  {advocate.yearsOfExperience}
                </td>
                <td className="p-2 border-2 border-gray-100 align-top">
                  {formatPhoneNumber(advocate.phoneNumber)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
