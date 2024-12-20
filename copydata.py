import os
import pyperclip
from pathlib import Path

def generate_tree(startpath):
    """Generate a tree structure of the project directory."""
    tree = []
    startpath = Path(startpath)
    
    for path in sorted(startpath.rglob('*')):
        # Skip node_modules directory
        if 'node_modules' in str(path):
            continue
            
        relative_path = path.relative_to(startpath)
        level = len(relative_path.parts) - 1
        
        if path.is_file() or path.is_dir():
            indent = '│   ' * (level) + '├── ' if level > 0 else ''
            name = path.name + '/' if path.is_dir() else path.name
            tree.append(f"{indent}{name}")
    
    return '\n'.join(tree)

def copy_project_contents(project_path, output_file):
    """Copy contents of project files to a single file and clipboard."""
    project_path = Path(project_path)
    
    content = """--- CONTEXT ---
Web Application Project Structure

This file contains the contents of all relevant files in the web application, including:
1. Python backend files (.py)
2. React/JavaScript files (.jsx, .js)
3. Configuration files (.json, .config.js)
4. HTML files (.html)
5. CSS files (.css)

--- BEGIN CONTENT ---

"""

    # File categories and their extensions
    file_categories = {
        'Python Backend': ['.py'],
        'React/JavaScript': ['.jsx', '.js'],
        'HTML': ['.html'],
        'CSS': ['.css'],
        'Configuration': ['.json', '.config.js', '.gitignore', '.env', 'README.md']
    }

    try:
        with open(output_file, 'w', encoding='utf-8') as outfile:
            outfile.write(content)

            # Process files by category
            for category, extensions in file_categories.items():
                outfile.write(f"\n\n=== {category} Files ===\n")
                
                for ext in extensions:
                    for file_path in project_path.rglob(f'*{ext}'):
                        # Skip node_modules and __pycache__ directories
                        if 'node_modules' in str(file_path) or '__pycache__' in str(file_path):
                            continue
                            
                        relative_path = file_path.relative_to(project_path)
                        file_content = f"\n\n--- Content of {relative_path} ---\n\n"
                        
                        try:
                            if file_path.is_file():  # Check if it's a file before trying to read
                                with open(file_path, 'r', encoding='utf-8') as infile:
                                    outfile.write(file_content)
                                    outfile.write(infile.read())
                        except Exception as e:
                            error_msg = f"\nError reading file {file_path}: {str(e)}\n"
                            outfile.write(error_msg)

            # Add directory tree at the end
            tree_content = "\n\n=== Directory Tree ===\n\n"
            tree_content += generate_tree(project_path)
            outfile.write(tree_content)

            # Read the complete content for clipboard
            outfile.seek(0)
            complete_content = outfile.read()
            
        # Copy to clipboard
        pyperclip.copy(complete_content)
        
        print(f"Project contents have been written to {output_file} and copied to clipboard")
        print("\nFile categories processed:")
        for category in file_categories:
            print(f"- {category}")
            
    except Exception as e:
        print(f"Error processing project files: {str(e)}")
        print(f"Make sure you have write permissions for {output_file}")

# Usage
if __name__ == "__main__":
    # Get the current working directory
    current_dir = Path.cwd()
    
    # Specify the project path and output file
    project_path = current_dir / "WEB_React"
    output_file = project_path / "project_contents.txt"
    
    # Create output directory if it doesn't exist
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    try:
        copy_project_contents(project_path, output_file)
    except Exception as e:
        print(f"Error processing project files: {str(e)}")
        print(f"Current working directory: {current_dir}")
        print(f"Project path: {project_path}")
        print(f"Output file: {output_file}")