import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Suggestions = ({ suggestions }) => {
  const [prompts, setPrmopts] = useState(new Array(suggestions.length).fill(''));
  const [snippets, setSnippets] = useState([...suggestions]);

  const handleSnippetChange = (index, value) => {
    const updatedSnippetValues = [...snippets];
    updatedSnippetValues[index] = value;
    setSnippets(updatedSnippetValues);
  };

  const handlePromptChange = (index, value) => {
    const updatedPromptValues = [...prompts];
    updatedPromptValues[index] = value;
    setPrmopts(updatedPromptValues);
  };

  const handleCreatePrompt = (index) => {
    if(!prompts[index] || prompts[index] === '/') {
        toast.error('Please input prompt');
        return;
    }
    const snippet = snippets[index];
    const prompt = prompts[index];

    // we need to make textblaze API call here to create snippet 
    toast.success('Prompt created Successfully');
  };

  return (
    <div>
         <Toaster />
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Snippet</th>
          <th scope="col">Prompt</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-hover">
          {suggestions.map((str, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td> 
                <textarea
                  rows="4" cols="50"
                  style={{border:"1px solid #c8cbcf"}}
                  value={snippets[index]}
                  onChange={(e) => handleSnippetChange(index, e.target.value)}
                />
              </td>
              <td> 
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">/</span>
                  </div>
                  <input  value={prompts[index]}  onChange={(e) => handlePromptChange(index, e.target.value)} type="text" className="form-control" placeholder="Prompt" aria-label="Username" aria-describedby="basic-addon1"/> 
                </div>
              </td>
              <td>
                <button className="btn btn-primary"  onClick={() => handleCreatePrompt(index)}>Add to Snippets</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Suggestions;
