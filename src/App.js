import React, { useState } from 'react';
import './App.css';

const FileCheckbox = ({ file, onFileChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={file.selected}
        onChange={() => onFileChange(file)}
      />
      {file.name}
    </div>
  );
};


const FolderCheckbox = ({ folder, onFolderChange, onFolderFileChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`folder ${isOpen ? 'open' : ''}`}>
      <input
        type="checkbox"
        checked={folder.selected}
        onChange={() => {
          onFolderChange(folder);
          handleToggle();
        }}
      />
      <span onClick={handleToggle}>{folder.name}</span>
      <div>
        {folder.files.map((file) => (
          <FileCheckbox
            key={file.id}
            file={file}
            onFileChange={(selectedFile) =>
              onFolderFileChange(folder, selectedFile)
            }
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: 'components',
      selected: false,
      files: [
        { id: 11, name: 'Header.js', selected: false },
        { id: 12, name: 'Footer.js', selected: false },
        { id: 13, name: 'Navbar.js', selected: false },],
    },
    {
      id: 2,
      name: 'pages',
      selected: false,
      files: [
        { id: 21, name: 'Home.js', selected: false },
        { id: 22, name: 'About.js', selected: false },
      ],
    },
    {
      id: 3,
      name: 'routes',
      selected: false,
      files: [
        { id: 31, name: 'Routes.js', selected: false }
      ],
    },
  ]);

  const handleFolderChange = (selectedFolder) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === selectedFolder.id
        ? {
            ...folder,
            selected: !folder.selected,
            files: folder.files.map((file) => ({
              ...file,
              selected: !folder.selected,
            })),
          }
        : folder
    );
    setFolders(updatedFolders);
  };

  const handleFolderFileChange = (folder, selectedFile) => {
    const updatedFolders = folders.map((f) => {
      if (f.id === folder.id) {
        const updatedFiles = f.files.map((file) =>
          file.id === selectedFile.id
            ? { ...file, selected: !file.selected }
            : file
        );
  
        return {
          ...f,
          files: updatedFiles,
          selected: updatedFiles.every((file) => file.selected),
        };
      }
      return f;
    });
  
    setFolders(updatedFolders);
  };

  return (
    <div>
      {folders.map((folder) => (
        <FolderCheckbox
          key={folder.id}
          folder={folder}
          onFolderChange={handleFolderChange}
          onFolderFileChange={handleFolderFileChange}
        />
      ))}
    </div>
  );
};

export default App;
