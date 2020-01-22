import { useState } from 'react';
import { Search, Container } from 'semantic-ui-react';
import _ from 'lodash';

function ProductFilter({ products }) {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');

  const source = products.map(product => {
    return {
      title: product.name,
      price: JSON.stringify(product.price),
      image: product.mediaUrl,
      href: `/product?_id=${product._id}`,
    };
  });
  const handleResultSelect = (e, { result }) => setValue(result.title);
  const handleSearchChange = (e, { value }) => {
    setLoading(true);
    setValue(value);
    setTimeout(() => {
      if (value.length < 1) {
        setLoading(false);
        setResults([]);
        setValue('');
        return;
      }
      const re = new RegExp(_.escapeRegExp(value), 'i');
      const isMatch = result => re.test(result.title);
      setLoading(false);
      setResults(_.filter(source, isMatch));
    }, 300);
  };

  return (
    <Container textAlign="center" style={{ margin: '2em' }}>
      <Search
        loading={isLoading}
        onResultSelect={(e, { result }) => handleResultSelect(e, { result })}
        onSearchChange={_.debounce(handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
      />
    </Container>
  );
}

export default ProductFilter;
