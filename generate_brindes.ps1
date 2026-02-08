$files = Get-ChildItem "$PSScriptRoot/public/images/products/brindes" -File | Select-Object -ExpandProperty Name
$products = @{}

Write-Host "Scanning $($files.Count) files from directory..."

foreach ($file in $files) {
    # Skip logos/banners
    if ($file -match "logo" -or $file -match "icon" -or $file -match "banner") { continue }

    $numericCode = $null
    $rawCode = $null

    # Pattern 1: Starts with ID (e.g. 01323-Mochila...)
    if ($file -match "^(\d{3,})-") {
        $rawCode = $matches[1]
        $numericCode = $rawCode
    }
    # Pattern 2: p_Code or home-Code prefixes
    elseif ($file -match "^(p_|home-)(\d{3,}[a-z]?)-") {
        $rawCode = $matches[2]
        $numericCode = $rawCode
    }
    # Pattern 3: ID embedded at end with timestamp (standard NEW format)
    # brindes_Category-Description-ID-Timestamp.jpg
    elseif ($file -match "-(\d{4,6})-\d{9,}.*\.(jpg|png|jpeg)$") {
        $numericCode = $matches[1]
        $rawCode = $numericCode
    }
    
    if ($null -ne $numericCode) {
        
        # Construct the image path
        $imagePath = "/images/products/brindes/$file"

        if (-not $products.ContainsKey($numericCode)) {
            $products[$numericCode] = @{
                id             = $numericCode
                title          = "Cod. $numericCode"
                category       = "Brindes"
                images         = @( $imagePath )
                candidateNames = @()
            }
        }
        else {
            $products[$numericCode].images += $imagePath
        }

        # --- NAME EXTRACTION ---
        
        # Pattern 1: CODE-Description-Numbers.ext
        if ($file -match "^$rawCode-(.+?)((-|\.|_)\d+)?\.(jpg|png|jpeg)$") {
            $possibleName = $matches[1]
            if ($possibleName -notmatch "^(azul|verde|vermelho|amarelo|preto|branco|rosa|bege|cinza|prata|dourado|laranja|roxo|lilas|marrom|transparente|[0-9]+|d\d+)$") {
                $products[$numericCode].candidateNames += $possibleName
            }
        }
        # Pattern 2: brindes_Category-Description-ID-Timestamp.jpg
        # We assume category does NOT have hyphens, or we match greedily until the ID.
        # Best approach: Match string BETWEEN the first hyphen (after prefix) and the ID.
        elseif ($file -match "brindes_[^-]+-(.+?)-$numericCode-\d+") {
            $possibleName = $matches[1]
            if ($possibleName -notmatch "^(azul|verde|vermelho|amarelo|preto|branco|rosa|bege|cinza|prata|dourado|laranja|roxo|lilas|marrom|transparente|[0-9]+|d\d+)$") {
                $products[$numericCode].candidateNames += $possibleName
            }
        }
        # Pattern 3: Fallback for p_Code-Name or home-Code-Name
        elseif ($file -match "^(p_|home-)$rawCode-(.+?)((-|\.|_)\d+)?\.(jpg|png|jpeg)$") {
            $possibleName = $matches[2]
            if ($possibleName -notmatch "^(azul|verde|vermelho|amarelo|preto|branco|rosa|bege|cinza|prata|dourado|laranja|roxo|lilas|marrom|transparente|[0-9]+|d\d+)$") {
                $products[$numericCode].candidateNames += $possibleName
            }
        }

        
        # --- CATEGORIZATION ---
        $lowerFile = $file.ToLower()
        if ($lowerFile -match "copo|caneca|garrafa|squeeze|jarra|termica|cantil|taca|xicara") {
            $products[$numericCode].subcategory = "Bebidas"
        }
        elseif ($lowerFile -match "caneta|lapis|marcar|escrita|bloco|caderno|agenda|pasta") {
            $products[$numericCode].subcategory = "Escrit$([char]0x00F3)rio" # Escritório
        }
        elseif ($lowerFile -match "mochila|bolsa|necessaire|sacola|mala|pochete") {
            $products[$numericCode].subcategory = "Bolsas e Mochilas"
        }
        elseif ($lowerFile -match "chaveiro|cordao|botton|pin") {
            $products[$numericCode].subcategory = "Chaveiros e Acess$([char]0x00F3)rios" # Acessórios
        }
        elseif ($lowerFile -match "tecno|usb|power|carregador|fone|mouse|som|caixa|inducao") {
            $products[$numericCode].subcategory = "Tecnologia"
        }
        elseif ($lowerFile -match "bone|camisa|camiseta|vestuario|textil|uniforme") {
            $products[$numericCode].subcategory = "T$([char]0x00EA)xtil" # Têxtil
        }
        elseif ($lowerFile -match "casa|cozinha|ferramenta|kit|vinho|churrasco") {
            $products[$numericCode].subcategory = "Casa e Gourmet"
        }
        elseif ($lowerFile -match "lanterna|luminaria|led") {
            $products[$numericCode].subcategory = "Lanternas e Lumin$([char]0x00E1)rias" # Lanternas e Luminárias
        }
    }
}

$finalProducts = @()
foreach ($key in $products.Keys) {
    $p = $products[$key]
    
    # Ensure product has images before processing
    if ($p.images.Count -eq 0) {
        continue
    }

    # Determine best title and match string
    $bestNameTitle = ""
    $bestNameMatch = ""
    
    # Sort candidates by length (descending) to get the most specific description
    $candidates = $p.candidateNames | Sort-Object { $_.Length } -Descending
    if ($candidates.Count -gt 0) {
        $bestNameMatch = $candidates[0] # Keep dashes for file matching
        $bestNameTitle = $candidates[0] -replace "-", " " 
    }

    $finalTitle = "Cod. $($p.id)"
    if ($bestNameTitle.Length -gt 2) {
        $finalTitle = "$finalTitle - $bestNameTitle"
    }

    # Sort images: 
    # 1. Matches the best name (descriptive file)
    # 2. Length Descending (Prefer "Mochila-Grande.jpg" over "Azul.jpg")
    $sortedImages = $p.images | Sort-Object { 
        if ($bestNameMatch -ne "" -and $_ -match [Regex]::Escape($bestNameMatch)) { 0 } else { 1 } 
    }, { $_.Length } -Descending

    $finalProducts += [PSCustomObject]@{
        id          = $p.id
        title       = $finalTitle
        images      = $sortedImages
        category    = $p.category
        subcategory = if ($p.subcategory) { $p.subcategory } else { "Outros" }
    }
}

$count = $finalProducts.Count
Write-Host "Generated $count products."

# Force UTF-8 encoding for Output
$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$jsonContent = $finalProducts | ConvertTo-Json -Depth 4
[System.IO.File]::WriteAllText("$PSScriptRoot/src/brindes.json", $jsonContent, [System.Text.Encoding]::UTF8)

Write-Host "JSON saved to src/brindes.json with UTF-8 encoding."
