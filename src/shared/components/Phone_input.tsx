import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

/* ================= TYPES ================= */

type PhoneInputProps = Omit<
    React.ComponentProps<"input">,
    "onChange" | "value" | "ref"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

/* ================= MAIN COMPONENT ================= */

const PhoneInput = React.forwardRef<
    React.ElementRef<typeof RPNInput.default>,
    PhoneInputProps
>(({ className, onChange, value, ...props }, ref) => {
    return (
        <RPNInput.default
            ref={ref}
            className={cn("flex w-full items-center", className)}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            smartCaret={false}
            value={value || undefined}
            onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
            {...props}
        />
    );
});

PhoneInput.displayName = "PhoneInput";

/* ================= INPUT ================= */

const InputComponent = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
    <Input
        ref={ref}
        className={cn(
            "rounded-r-lg rounded-l-none border-l-0 h-10",
            className
        )}
        {...props}
    />
));

InputComponent.displayName = "InputComponent";

/* ================= COUNTRY SELECT ================= */

type CountryEntry = {
    label: string;
    value: RPNInput.Country | undefined;
};

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: CountryEntry[];
    onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange,
}: CountrySelectProps) => {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Popover
            open={isOpen}
            modal
            onOpenChange={(open) => {
                setIsOpen(open);
                if (open) setSearchValue("");
            }}
        >


            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search country..."
                        value={searchValue}
                        onValueChange={(value) => {
                            setSearchValue(value);

                            setTimeout(() => {
                                const viewport = scrollAreaRef.current?.querySelector(
                                    "[data-radix-scroll-area-viewport]"
                                );
                                if (viewport) viewport.scrollTop = 0;
                            }, 0);
                        }}
                    />

                    <CommandList>
                        <ScrollArea ref={scrollAreaRef} className="h-72">
                            <CommandEmpty>No country found.</CommandEmpty>

                            <CommandGroup>
                                {countryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                            onSelectComplete={() => setIsOpen(false)}
                                        />
                                    ) : null
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className="flex items-center gap-1 rounded-l-lg rounded-r-none border-r-0 px-3 h-10"
                >
                    <FlagComponent
                        country={selectedCountry}
                        countryName={selectedCountry}
                    />
                    <ChevronsUpDown className="size-4 opacity-70" />
                </Button>
            </PopoverTrigger>
        </Popover>
    );
};

/* ================= OPTION ================= */

interface CountrySelectOptionProps extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country;
    onChange: (country: RPNInput.Country) => void;
    onSelectComplete: () => void;
}

const CountrySelectOption = ({
    country,
    countryName,
    selectedCountry,
    onChange,
    onSelectComplete,
}: CountrySelectOptionProps) => {
    const handleSelect = () => {
        onChange(country);
        onSelectComplete();
    };

    return (
        <CommandItem className="flex items-center gap-2" onSelect={handleSelect}>
            <FlagComponent country={country} countryName={countryName} />

            <span className="flex-1 text-sm">{countryName}</span>

            <span className="text-sm text-muted-foreground">
                +{RPNInput.getCountryCallingCode(country)}
            </span>

            <CheckIcon
                className={cn(
                    "ml-auto size-4",
                    country === selectedCountry ? "opacity-100" : "opacity-0"
                )}
            />
        </CommandItem>
    );
};

/* ================= FLAG ================= */

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-muted">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};

/* ================= EXPORT ================= */

export { PhoneInput };