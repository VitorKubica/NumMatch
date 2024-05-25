'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [columnValues, setColumnValues] = useState<string>('');
  const [targetNumber, setTargetNumber] = useState<string>('0');
  const [combinations, setCombinations] = useState<number[][]>([]);
  const [exactMatch, setExactMatch] = useState<boolean>(false);
  const [noMatches, setNoMatches] = useState<boolean>(false);

  const handleColumnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setColumnValues(event.target.value);
  };

  const handleTargetNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = event.target.value.replace(/,/g, '.');
    setTargetNumber(formattedValue);
  };

  const findCombinations = () => {
    const values = columnValues.split('\n').map(value => parseFloat(value.replace(/,/g, '.')));
    const target = parseFloat(targetNumber);
    const foundCombinations: number[][] = [];

    const findSums = (nums: number[], target: number, partial: number[] = []) => {
      const sum = partial.reduce((a, b) => a + b, 0);
      if (sum === target && partial.length > 0) {
        foundCombinations.push(partial);
      }
      if (sum >= target) {
        return; // if we reach the number return
      }
      for (let i = 0; i < nums.length; i++) {
        const n = nums[i];
        const remaining = nums.slice(i + 1);
        findSums(remaining, target, partial.concat([n]));
      }
    };

    // Verificando se o valor exato está presente
    if (values.includes(target)) {
      setExactMatch(true);
      setNoMatches(false);
      setCombinations([]);
      return;
    } else {
      setExactMatch(false);
    }

    findSums(values, target);

    if (foundCombinations.length > 0) {
      setCombinations(foundCombinations);
      setNoMatches(false);
    } else {
      setNoMatches(true);
    }
  };

  return (
    <main className="bg-white h-full bg-banner-inicial bg-cover flex justify-center">
      <div className="flex flex-col justify-center items-center bg-white w-[520px] my-10 pb-5 rounded-xl bg-opacity-95">
        <Image src="/logo.webp" alt="" width={140} height={200}/>
        <div className='bg-yellow-400 flex flex-col justify-center items-center px-2 py-8 rounded-xl w-[470px]'>
          <h1 className='text-black font-medium text-xl px-10 font-sans mb-1 text-center'>Cole a coluna de valores na caixa de texto abaixo!</h1>
          <p className='text-red-400 mb-6 font-semibold text-xs'>lembre de apenas colocar números!</p>
          <div className='flex flex-col w-[300px]'>
          <div className='flex flex-col mb-2'>
            <label htmlFor="Valores" className='text-black'>Valor Vindi</label>
            <Textarea
              placeholder="Cole a coluna de valores aqui..."
              className='text-black'
              value={columnValues}
              onChange={handleColumnChange}
            />
          </div>
          <div className='flex flex-col mb-6'>
            <label htmlFor="Valores" className='text-black'>Valor Banco</label>
            <Input
              type="text"
              placeholder="Digite o número alvo..."
              className='text-black'
              value={targetNumber}
              onChange={handleTargetNumberChange}
            />
          </div>
          <Button variant={'secondary'} onClick={findCombinations} className='flex justify-center'>
            <Search width={14} className='mr-1'/> Encontrar
          </Button>
          <div className='mt-4 w-48'>
            <p className='text-left w-full text-yellow-950 font-semibold text-xl'>Combinações:</p>
            {exactMatch && (
              <p className='font-semibold flex text-green-500'>
                <Check width={16} className='mr-1'/> Valor exato encontrado!
              </p>
            )}
            {combinations.slice(0, 3).map((combination, index) => (
              <p key={index} className='font-semibold flex'>
                <Check width={16} className='mr-1'/>{combination.join(' , ')}
              </p>
            ))}
            {noMatches && (
              <p className='text-red-500 font-semibold'>
                Nenhum valor ou combinação encontrada.
              </p>
            )}
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
